const fs = require('fs');
const path = require('path');
const axios =  require("axios");
const Products = require('../models/product.model');
const supplierModel = require('../models/supplier.model');
const { privateDecrypt } = require('crypto');

const updateProduct = async(req, res) => {

  const productid = new mongoose.Types.ObjectId("672f70f4114bc486efd1af20");
  // {quantity, price, total_sold, productthreshold, supplierName} = req.body ||
  const data =  {quantity:8, price:12, total_sold :32, productthreshold: 5, supplierName: 'Malli'}
  console.log(data)
  const updateProduct = await Products.updateOne({_id: productid}, {$set: data})
  console.log(updateProduct)
  return res.json(updateProduct)
}
const insertProduct = async(req, res) => {
  console.log("Hii")
  const shopid = req.shopid || "HOP002"
  console.log("Hiii Baby")
  const productName = req.body.productname;

  const product = await Products.findOne({productname: productName, shopid: shopid})


  const {supplierName, supplierEmail} = req.body;
  console.log(supplierEmail, supplierName)
  
  

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
          
          const response = await axios.get(apiUrl);
          
          
          const base64Data = response.data.base64; 
          
          if (!base64Data) {
              console.error('No base64 data found in the response.');
              return;
          }


const imageBuffer = Buffer.from(base64Data, "base64")
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

  const barcodeId = (result + productName.slice(0,3)+ shopid.slice(0,3)).trim()
  const imageName = `barcode${barcodeId}.png`
  generateBarcode(barcodeId);

  const createProduct = await Products.create({barcodeid: barcodeId,imagename: imageName, productname: productName, quantity: 0, price: 0, total_sold: 0, shopid: "SHOP001", productthreshold: 0, supplierName:supplierName} )//////
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


  console.log(createProduct)
  return res.json({imagesource: imageName})
}


const deleteItem = async(req, res) => {
  console.log("Deleteing")
  const shopid = req.shopid;
  const {itemId} = req.body;
  console.log(itemId)
  await Cart.deleteOne({_id: itemId, shopid: shopid})
  const cartItems = await Cart.find({shopid: shopid});
  return res.json({cartItems: cartItems})
}
module.exports = {insertProduct, updateProduct}