const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Products = require('../models/product.model');
const supplierModel = require('../models/supplier.model');

const updateProduct = async (req, res) => {
  const productid = new mongoose.Types.ObjectId("672f70f4114bc486efd1af20");
  const data = { quantity: 8, price: 12, total_sold: 32, productthreshold: 5, supplierName: 'Malli' };
  const updateProduct = await Products.updateOne({ _id: productid }, { $set: data });
  return res.json(updateProduct);
}

const insertProduct = async(req, res) => {
    console.log("Hii")
    const shopid = req.shopid || "HOP002"
    console.log("Hiii Baby")
    const productName = req.body.productName;
    console.log("productname", productName)
    const product = await Products.findOne({productname: productName, shopid: shopid})

    /////////////
    const {supplierName, supplierEmail, price} = req.body;
    console.log(supplierEmail, supplierName)
    
    ///////////

    if(product)
    {
        const imageName = product.imagename;
        console.log(imageName)
        return res.json({imagesource: imageName})
    }


    function convertTextToNumber(text) {
        let numericValue = 0;
        for (let i = 0; i < text.length; i++) {
            numericValue += text.charCodeAt(i);
        }

        return numericValue.toString().slice(0, 16);
    }

    const result = convertTextToNumber(productName);
    
    async function generateBarcode(result) {
        const apiUrl = `https://barcodeapi.org/api/${result}`;

        try {
            // Fetch the barcode data (assuming it's JSON)
            const response = await axios.get(apiUrl);
            
            // Extract the base64 string from the response
            const base64Data = response.data.base64; // Adjust based on actual structure
            
            if (!base64Data) {
                console.error('No base64 data found in the response.');
                return;
            }

  // Specify the file path to save the image
  const imageBuffer = Buffer.from(base64Data, "base64")
  const imagesDir = path.join(__dirname, "../../client/public/images");//file path changed check later
  if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
  }
  
  const imagePath = path.join(imagesDir, `barcode${result}.png`);
  

  fs.writeFileSync(imagePath, imageBuffer);
  console.log('Barcode image saved successfully:', imagePath);

        } catch (error) {
            console.error('Error generating barcode:', error);
        }
    }

    // Example usage
    const barcodeId = (result + productName.slice(0,3)+ shopid.slice(0,3)).trim()
    const imageName = `barcode${barcodeId}.png`
    generateBarcode(barcodeId);

    const createProduct = await Products.create({barcodeid: barcodeId,imagename: imageName, productname: productName, quantity: 0, price: price, total_sold: 0, shopid: "SHOP001", productthreshold: 0, supplierName:supplierName} )//////
    const existingSupplier = await supplierModel.findOne({ supplierName, supplierEmail });
    if (existingSupplier) {
        existingSupplier.products.push(productName);
        console.log(existingSupplier)
        await existingSupplier.save();
    } else {
        const supEmail = await supplierModel.find({supplierEmail: supplierEmail})
        if(supEmail.length > 0)
        {
            return res.json({msg: "Supplier email already present. Check the username"})
        }
        const newSupplier = await supplierModel.create({ supplierName, supplierEmail, products: [productName] });
        console.log(newSupplier)
        await newSupplier.save();
    }
    ////////////////////////////////////////////////


    console.log(createProduct)
    return res.json({imagesource: imageName})
}

const deleteItem = async (req, res) => {
  const shopid = req.shopid;
  const { itemId } = req.body;
  await Cart.deleteOne({ _id: itemId, shopid: shopid });
  const cartItems = await Cart.find({ shopid: shopid });
  return res.json({ cartItems: cartItems });
}

module.exports = { insertProduct, updateProduct, deleteItem };
