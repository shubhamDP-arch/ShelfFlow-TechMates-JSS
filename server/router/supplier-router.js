const express = require('express');
const Products = require('../models/product.model'); // Adjust path as needed
const nodemailer = require('nodemailer');
const router = express.Router();
const Suppliers = require("../models/supplier.model")

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Change to your email service
  auth: {
    user: process.env.MY_EMAIL,     // Your email
    pass: process.env.MY_PASSWORD         // Your app password
  }
});

// NEW ENDPOINT: POST endpoint to fetch only products that need restocking (below threshold)
router.post('/products/restock', async (req, res) => {
  try {
    const { shopid } = req.body;
    console.log(shopid)
    // Validate if shopid is provided
    if (!shopid) {
      return res.status(400).json({
        success: false,
        message: 'Shop ID is required'
      });
    }

    // Fetch products that need restocking
    // Products where quantity <= threshold OR (quantity = 0 regardless of threshold)
    const products = await Products.find({
      shopid: shopid,
      $or: [
        { quantity: 0 }, // Out of stock products
        { 
          $expr: { 
            $and: [
              { $ne: ["$productthreshold", null] }, // Has a threshold set
              { $lte: ["$quantity", "$productthreshold"] } // Quantity is less than or equal to threshold
            ]
          }
        }
      ]
    });

    console.log("HII" + products)

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No products need restocking - all items are well stocked!',
        data: []
      });
    }

    // Transform data for frontend with restock-specific information
    const transformedProducts = products.map(product => {
      let availability = 'In Stock';
      let urgencyLevel = 'low';
      
      // Determine availability status and urgency
      if (product.quantity === 0) {
        availability = 'Out of Stock';
        urgencyLevel = 'critical';
      } else if (product.productthreshold && product.quantity <= (product.productthreshold * 0.5)) {
        availability = 'Critical Stock';
        urgencyLevel = 'high';
      } else if (product.productthreshold && product.quantity <= product.productthreshold) {
        availability = 'Low Stock';
        urgencyLevel = 'medium';
      }

      return {
        id: product._id,
        barcodeid: product.barcodeid,
        name: product.productname,
        quantity: product.quantity,
        price: `₹${product.price}`,
        priceNumeric: product.price,
        image: product.imagename || '/default-product.jpg',
        availability: availability,
        urgencyLevel: urgencyLevel,
        totalSold: product.total_sold,
        revenueGenerated: product.revenue_generated,
        threshold: product.productthreshold || 10, // Default threshold if not set
        supplierName: product.supplierName || 'Default Supplier',
        shopid: product.shopid,
        stockDeficit: Math.max((product.productthreshold || 10) - product.quantity, 0),
        suggestedOrderQty: Math.max(((product.productthreshold || 10) * 2) - product.quantity, 50)
      };
    });

    // Sort by urgency (critical first, then high, then medium)
    transformedProducts.sort((a, b) => {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel];
    });

    console.log(`Found ${transformedProducts.length} products needing restock for shop ${shopid}`);

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Products needing restock fetched successfully',
      count: transformedProducts.length,
      summary: {
        critical: transformedProducts.filter(p => p.urgencyLevel === 'critical').length,
        high: transformedProducts.filter(p => p.urgencyLevel === 'high').length,
        medium: transformedProducts.filter(p => p.urgencyLevel === 'medium').length,
        estimatedRestockCost: transformedProducts.reduce((sum, p) => sum + (p.suggestedOrderQty * p.priceNumeric), 0)
      },
      data: transformedProducts
    });

  } catch (error) {
    console.error('Error fetching products needing restock:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching products needing restock',
      error: error.message
    });
  }
});

// POST endpoint to send restock order email to supplier
router.post('/giveorder', async (req, res) => {
  try {
    const { productCode, quantity, expectedDate,  } = req.body;

    // Validate required fields
    if (!productCode || !quantity || !expectedDate ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: productCode, quantity, expectedDate, '
      });
    }

    // Validate quantity is a positive number
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive number'
      });
    }

    // Validate email format
    
    

    // Find the product by barcode to get details
    const product = await Products.findOne({ barcodeid: productCode });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found with the provided barcode'
      });
    }

    const supplierName = product.supplierName;
    console.log("Supplier Email: " + supplierName)
    const supplier = await Suppliers.findOne({ supplierName: supplierName });
    console.log("Supplier: " + supplier)
    // Calculate order details
    const totalCost = product.price * quantity;
    const currentDate = new Date().toLocaleDateString('en-IN');
    const formattedExpectedDate = new Date(expectedDate).toLocaleDateString('en-IN');

    // Create email content
    const emailSubject = `🛒 Restock Order Request - ${product.productname}`;
    
    const emailHTML = `

  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border: 1px solid #ddd;">
    <h2 style="color: #333;">Restock Request</h2>
    <p>Hello ${supplier.supplierName},</p>
    <p>We need to restock the following product:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr style="background-color: #eee;">
        <th style="text-align: left; padding: 8px; border: 1px solid #ccc;">Product Name</th>
        <td style="padding: 8px; border: 1px solid #ccc;">${product.productname}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid #ccc;">Product Code</th>
        <td style="padding: 8px; border: 1px solid #ccc;">${productCode}</td>
      </tr>
      <tr style="background-color: #eee;">
        <th style="text-align: left; padding: 8px; border: 1px solid #ccc;">Quantity</th>
        <td style="padding: 8px; border: 1px solid #ccc;">${quantity}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid #ccc;">Expected Delivery Date</th>
        <td style="padding: 8px; border: 1px solid #ccc;">${expectedDate}</td>
      </tr>
    </table>

    <p>Please confirm the order at your earliest convenience.</p>
    <p>Thank you,</p>
    <p><strong>SafeTracker Inventory Team</strong></p>
  </div>


    `;

    // Email options
    const mailOptions = {
      from: process.env.MY_EMAIL || 'your-email@gmail.com',
      to: supplier.supplierEmail,
      subject: emailSubject,
      html: emailHTML,
      // Add text version for email clients that don't support HTML
      text: `
URGENT RESTOCK ORDER REQUEST

Product: ${product.productname}
Product Code: ${productCode}
Current Stock: ${product.quantity} units
Requested Quantity: ${quantity} units
Total Cost: ₹${totalCost.toLocaleString()}
Expected Delivery: ${formattedExpectedDate}

${product.quantity === 0 ? 'CRITICAL: Product is OUT OF STOCK!' : `LOW STOCK: Below threshold of ${product.productthreshold} units`}

Please confirm order acceptance and delivery schedule.

Order Date: ${currentDate}
Shop ID: ${product.shopid}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Restock order email sent successfully to ${supplier.supplierEmail}:`, info.messageId);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Restock order email sent successfully to supplier',
      data: {
        productName: product.productname,
        productCode: productCode,
        quantity: quantity,
        totalCost: totalCost,
        expectedDate: formattedExpectedDate,
        supplierEmail: supplier.supplierEmail,
        emailId: info.messageId,
        currentStock: product.quantity,
        stockAfterDelivery: product.quantity + quantity
      }
    });

  } catch (error) {
    console.error('Error sending restock order email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send restock order email',
      error: error.message
    });
  }
});

// POST endpoint to fetch all products by shopid (keeping the original endpoint)
router.post('/products/fetch', async (req, res) => {
  try {
    const { shopid } = req.body;

    // Validate if shopid is provided
    if (!shopid) {
      return res.status(400).json({
        success: false,
        message: 'Shop ID is required'
      });
    }

    // Fetch all products for the given shopid
    const products = await Products.find({ shopid: shopid });

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this shop',
        data: []
      });
    }

    // Transform data for frontend (add availability status based on quantity and threshold)
    const transformedProducts = products.map(product => {
      let availability = 'In Stock';
      
      // Determine availability status
      if (product.quantity === 0) {
        availability = 'Out of Stock';
      } else if (product.productthreshold && product.quantity <= product.productthreshold) {
        availability = 'Limited Stock';
      }

      return {
        id: product._id,
        barcodeid: product.barcodeid,
        name: product.productname,
        quantity: product.quantity,
        price: `₹${product.price}`,
        priceNumeric: product.price,
        image: product.imagename || '/default-product.jpg',
        availability: availability,
        totalSold: product.total_sold,
        revenueGenerated: product.revenue_generated,
        threshold: product.productthreshold,
        supplierName: product.supplierName,
        shopid: product.shopid
      };
    });
    
    console.log(transformedProducts)
    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: transformedProducts.length,
      data: transformedProducts
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching products',
      error: error.message
    });
  }
});

// GET endpoint (alternative) - shopid passed as query parameter
router.get('/products/:shopid', async (req, res) => {
  try {
    const { shopid } = req.params;

    // Validate if shopid is provided
    if (!shopid) {
      return res.status(400).json({
        success: false,
        message: 'Shop ID is required'
      });
    }

    // Fetch all products for the given shopid
    const products = await Products.find({ shopid: shopid });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this shop',
        data: []
      });
    }

    // Transform data for frontend
    const transformedProducts = products.map(product => {
      let availability = 'In Stock';
      
      if (product.quantity === 0) {
        availability = 'Out of Stock';
      } else if (product.productthreshold && product.quantity <= product.productthreshold) {
        availability = 'Limited Stock';
      }

      return {
        id: product._id,
        barcodeid: product.barcodeid,
        name: product.productname,
        quantity: product.quantity,
        price: `₹${product.price}`,
        priceNumeric: product.price,
        image: product.imagename || '/default-product.jpg',
        availability: availability,
        totalSold: product.total_sold,
        revenueGenerated: product.revenue_generated,
        threshold: product.productthreshold,
        supplierName: product.supplierName,
        shopid: product.shopid
      };
    });

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: transformedProducts.length,
      data: transformedProducts
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching products',
      error: error.message
    });
  }
});

module.exports = router;