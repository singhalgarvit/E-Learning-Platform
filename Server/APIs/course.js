/*
    /api/course
*/

const express = require('express')
const router = express.Router();
const { verifyToken, requireRole } = require('../middlewares/auth');
const Course = require('../database/schema/course.schema');
const User = require('../database/schema/user.schema');
const { default: mongoose } = require('mongoose');

router.post('/',verifyToken,requireRole(['admin']),async(req,res)=>{
    const {name,category,price,details} = req.body;
    const _id = new mongoose.Types.ObjectId();                //generate unique object id for every data entry
   try{
       const creator = await User.findOne({email:req.user.email});
       const newCourse = new Course({_id,name,category,price,details,createdBy:creator._id})
       await newCourse.save();
       res.status(200).json("Course Created Successfully");
   }catch(err){
        res.status(500).json("Something Went Wrong !!");
   }
})

module.exports = router;