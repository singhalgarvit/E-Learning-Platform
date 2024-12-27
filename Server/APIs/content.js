/*
    /api/content
*/

const express = require('express')
const router = express.Router();
const { verifyToken, requireRole } = require('../middlewares/auth');
const Course = require('../database/schema/course.schema');
const User = require('../database/schema/user.schema');
const Content = require('../database/schema/content.schema')
const { default: mongoose } = require('mongoose');
const hasPurchased = require('../middlewares/hasPurchased');


router.get('/',verifyToken,hasPurchased(true),async(req,res)=>{                                          //To find the course by courseId
    const course_id = req.headers.course_id;
    try{    
        const content = await Content.find({course:course_id});
        if(!content)return res.status(404).json("Content Not Found")                  //If no corresponding course is found then return with 404
        res.status(200).json(content);                                               //ohterwise respond with the course
    }catch(err){
        res.status(500).json("Something Went Wrong !!" );
    }
})

router.post('/',verifyToken,requireRole(['admin']),async(req,res)=>{                //Create a new course (only admin can)
    const course_id = req.headers.course_id;
    const {name,description,url} = req.body;
    const _id = new mongoose.Types.ObjectId();                                      //generate unique object id for every data entry
   try{
       const newContent = new Content({_id,name,description,url,course:course_id})    
       await newContent.save();
       res.status(200).json("Content Created Successfully");
   }catch(err){
        res.status(500).json("Something Went Wrong !!");
   }
})

router.delete('/:content_id',verifyToken,requireRole(['admin']),async(req,res)=>{              //To delete the course by courseId
    const content_id = req.params.content_id;
    try{
        const content = await Content.findByIdAndDelete(content_id);                   //delete the course by finding its id
        if(!content)return res.status(404).json("Content Not Found")                  //If no corresponding course is found then return with 404
        res.status(200).json("Content Deleted Successfully");                                               //ohterwise respond with the course
    }catch(err){
        res.status(500).json("Something Went Wrong !!" );
    }
})

module.exports = router;