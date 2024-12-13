/*
    /auth/signup
*/

const express = require("express");
const router = express.Router();
const User = require("../database/schema/user.schema");
const jwt = require('jsonwebtoken');
const {default: mongoose} = require("mongoose");
const userExist = require("../middlewares/userExist");

const jwtSecret=process.env.jwt_Secret_key;

router.post("/", userExist(false), async (req, res) => {    //if userExist is false (User does not exist till now only then he will be able to signup).
  const {name, email, password} = req.body;                 //extract the data from body 
  const _id = new mongoose.Types.ObjectId();                //generate unique object id for every data entry
  try {
    const user = new User({_id, name, email, password});    //create a new User Object
    await user.save();                                      //Save that user to the database;
    const role = user.role;
    const token = jwt.sign({name,email,role},jwtSecret);    //Generate JWT token for name, email and role
    res.status(200).json(token);        
  } catch (err) {
    res.status(500).json("Something Went Wrong !!!");
  }
});

module.exports = router;
