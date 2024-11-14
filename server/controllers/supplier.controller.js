const supplierModel = require('../models/supplier.model');

const getAllSupplier = async(req, res)=>{
  const {shopId} = req.body;

  const Allsupplier = await supplierModel.find({});

  res.status(200).json(Allsupplier)


}

module.exports =  {getAllSupplier}