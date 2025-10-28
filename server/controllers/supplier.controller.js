const supplierModel = require('../models/supplier.model');

const getAllSupplier = async(req, res)=>{
  console.log("Come")

  const allSuplliers = await supplierModel.find({})
  console.log(allSuplliers)

  return res.json({data: allSuplliers})

}

module.exports =  {getAllSupplier}