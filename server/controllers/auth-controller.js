const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Products = require('../models/product.model');
const supplierModel = require('../models/supplier.model');
const Cart = require("../models/cart-model");
const Orders = require('../models/order.model');
const mongoose = require('mongoose');


const updateProduct = async (req, res) => {
  try {
    const { productid, quantity, price, total_sold, productthreshold, supplierName } = req.body;

    if (!productid) {
      return res.status(400).json({ msg: "Product ID is required." });
    }

    const data = { quantity, price, total_sold, productthreshold, supplierName };

    const result = await Products.updateOne({ _id: productid }, { $set: data });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Product not found or already up to date." });
    }

    return res.json({ msg: "Product updated successfully.", result });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


const updateStock = async (req, res) => {
  console.log(req.body, "req");
  const { cartItems } = req.body;
  const shopid = req.body.shopid;
  console.log(`Shopid is ${shopid} guysss`)
  const errorItems = [];

  console.log("cartItems", cartItems);

  cartItems.sort((a, b) => a.quantity - b.quantity);
  console.log("sorted cartitems", cartItems);

  for (const element of cartItems) {
    const product = await Products.findOne({ shopid: shopid, productname: element.productname });

    if (!product) {
      errorItems.push({ productname: element.productname, message: "Product not found" });
      continue;
    }

    console.log(product, "product");

    if (product.quantity < element.quantity) {
      errorItems.push(product);
    } else {
      product.quantity -= element.quantity;
      product.total_sold += element.quantity;
      product.revenue_generated += product.price * element.quantity;
      await Products.updateOne({ _id: product._id }, { $set: { quantity: product.quantity, total_sold: product.total_sold, revenue_generated: product.revenue_generated } });

      const itemid = element._id;
      console.log(itemid);
      await Cart.deleteOne({ shopid: shopid, _id: itemid });
    }
  }

  console.log("errorItems", errorItems);
  if (errorItems.length < 1) {
    return res.json({ success: true, message: "Stock updated successfully" });
  } else {
    return res.json({ success: false, errorItems: errorItems, message: "Insufficient Stock" });
  }
};

const addToCart = async (req, res) => {
  const { productname, quantity, shopid } = req.body;
  console.log(productname, quantity, shopid);

  const addItemToCart = await Cart.create({ productname, quantity, shopid });
  console.log(addItemToCart);

  const cartItems = await Cart.find({ shopid: shopid });
  return res.json({ cartItems: cartItems });
};

const insertProduct = async (req, res) => {
  console.log("Inserting Product");
  console.log(req.body);
  const productName = req.body.productName;
  const shopid = req.body.shopid;
  console.log("productname", productName);
  const product = await Products.findOne({ productname: productName, shopid: shopid });

  const { supplierName, supplierEmail, price } = req.body;
  console.log(supplierEmail, supplierName);

  if (product) {
    const imageName = product.imagename;
    console.log(imageName);
    return res.json({ imagesource: imageName });
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
      const response = await axios.get(apiUrl);
      const base64Data = response.data.base64;

      if (!base64Data) {
        console.error('No base64 data found in the response.');
        return;
      }

      const imageBuffer = Buffer.from(base64Data, "base64");
      const imagesDir = path.join(__dirname, "../../client/public/images");
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

  const barcodeId = (result.toString().slice(0,2) + productName.slice(0, 3) + shopid.slice(0, 1)).trim();
  const imageName = `barcode${barcodeId}.png`;
  generateBarcode(barcodeId);

  const createProduct = await Products.create({ barcodeid: barcodeId, imagename: imageName, productname: productName, quantity: 0, price: price, total_sold: 0, shopid: shopid, productthreshold: 0, supplierName: supplierName });
  const existingSupplier = await supplierModel.findOne({ supplierName, supplierEmail });
  if (existingSupplier) {
    existingSupplier.products.push(productName);
    console.log(existingSupplier);
    await existingSupplier.save();
  } else {
    const supEmail = await supplierModel.find({ supplierEmail: supplierEmail });
    if (supEmail.length > 0) {
      return res.json({ msg: "Supplier email already present. Check the username" });
    }
    const newSupplier = await supplierModel.create({ supplierName, supplierEmail, products: [productName] });
    console.log(newSupplier);
    await newSupplier.save();
  }

  console.log(createProduct);
  return res.json({ imagesource: imageName });
};

const deleteItem = async (req, res) => {
  const shopid = req.body.shopid;
  console.log("Deleting");
  const { itemId } = req.body;
  console.log(itemId);
  await Cart.deleteOne({ _id: itemId });
  const cartItems = await Cart.find({ shopid: shopid });
  return res.json({ cartItems: cartItems });
};

const getCartItems = async (req, res) => {
  console.log("Get all cart items");
  const shopid = req.body.shopid;
  console.log(`shopid  ${shopid}`)
  const cartItems = await Cart.find({ shopid: shopid });
  return res.json({ cartItems: cartItems });
};

const scanProduct = async (req, res) => {
  const { data, shopid } = req.body;
  console.log("data", shopid, data);
  const fetchProduct = await Products.findOne({ barcodeid: data, shopid: shopid });
  if (!fetchProduct) {
    return res.json({ productname: "Scan Again" });
  }
  return res.json({ productname: fetchProduct.productname });
};

const addOrder = async (req, res) => {
  const shopId = req.body.shopid;
  try {
    console.log(req.body, "Adding Order");

    const { quantity, expDate, productname } = req.body;

    const createOrder = await Orders.create({ 
      quantity, 
      exp_date: expDate, 
      name: productname, 
      shopId 
    });


    // const updatedProduct = await Products.findOneAndUpdate(
    //   { name: productname, shopId: shopId },
    //   { $inc: { quantity: quantity } },
    //   { new: true } 
    // );

    // await updatedProduct.save();

    const product= await Products.findOne({productname: productname})


    const updated = await Products.updateOne({productname: productname}, {$inc: {quantity: quantity}})

    console.log(updated)
    return res.status(201).json({success: true});

  } catch (error) {
    console.error("Error adding order:", error);
    return res.status(500).json({ message: "Error adding order", error: error.message });
  }
};


const getProducts = async (req, res) => {
  console.log(req.body);
  const shopid = req.body.shopid;
  console.log(`${shopid} is shop id`)
  const allProducts = await Products.find({ shopid: shopid });
  console.log(allProducts);
  res.json({ products: allProducts });
};

const productDetails = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  const product = await Products.findOne({ _id: productId });
  console.log(product);
  return res.json(product);
};

const soldProducts = async (req, res) => {
  const shopid = req.body.shopid;
  try {
    const allProducts = await Products.find({ shopid: shopid });
    console.log(allProducts);

    allProducts.sort((a, b) => b.total_sold - a.total_sold);

    return res.json({ items: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateStock, addToCart, insertProduct, updateProduct, deleteItem, getCartItems, scanProduct, getProducts, productDetails, soldProducts, addOrder };
