/*
    /auth/login
*/

const express = require("express");
const router = express.Router();
const User = require("../database/schema/user.schema");
const jwt = require('jsonwebtoken');
const {default: mongoose} = require("mongoose");
const userExist = require("../middlewares/userExist");

const jwtSecret=process.env.jwt_Secret_key;

router.post("/", userExist(true), async (req, res) => {     //if userExist is true (User exist  only then he will be able to login).
  const {email, password} = req.body;                       //extract the data from body 
    if(req.savedPassword == password){                      //check if the password is matched
        const name = req.savedName;
        const role = req.savedRole;
        const token = jwt.sign({name,email,role},jwtSecret);//Generate JWT Token for name , email and role
        res.status(200).json(token);        
    }
    else{
        res.status(401).json("Password is incorrect");
    }
});

module.exports = router;
