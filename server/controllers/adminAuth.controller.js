// const { access } = require("fs");
const Admin = require("../models/admin.model.js"); 
// const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const Otps = require("../models/otp-model")
const nodemailer = require("nodemailer")
// const bcrypt = require("bcrypt")

const registerAdmin  = async(req, res) =>{

    const {adminName, email, password} = req.body;
    const shopID = crypto.randomBytes(8).toString("hex");
    console.log(email)
    console.log(shopID)

  
    const otp = Math.floor(Math.random() * 9000) + 1000;
    const userEmail = await Admin.find({email: email})
    console.log(otp)
    if(userEmail.length != 0){
        return res.status(404).json({alreadymsg: "User already registered. Please Login"})
    }
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'Sending Email using Node.js',
        text: `Your otp is ${otp}`
      };
      
      transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
          console.log(error);
        } else {
            const createOtp = await Otps.create({shopid: shopID,username: adminName, email: email, password, otp})
            return res.status(200).json({msg: "Email Sent"})
        }
      });
}

const loginAuth = async(req, res) =>{
  const {email, password} = req.body
  console.log(email, password)
  const admin = await Admin.findOne({email: email})

  if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
  }

  const isPasswordValid = await admin.isPasswordCorrect(password)

  if(!isPasswordValid){
      return res.status(401).json({ message: "Incorrect password" });

  }
  const accessToken = await admin.generateAccessToken(admin._id)
  console.log(accessToken)

  return res.status(200).json(
      {admin, accessToken, sucmsg: "Loggined Successfully" }
  )
}



module.exports = {registerAdmin, loginAuth}