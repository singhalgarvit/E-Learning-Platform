/*
    /api/course
*/

const express = require("express");
const router = express.Router();
const {verifyToken, requireRole} = require("../middlewares/auth");
const Course = require("../database/schema/course.schema");
const User = require("../database/schema/user.schema");
const {default: mongoose} = require("mongoose");

router.get("/", async (req, res) => {
  //To get all courses
  try {
    const allCourses = await Course.find({});
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).json("Something Went Wrong !!");
  }
});

router.get("/mycourses", verifyToken, async (req, res) => {
  //To find the purchased Courses of a User
  try {
    const myCourses = await User.findOne({email: req.user.email})
      .populate("courses")
      .exec();
    if (!myCourses) return res.status(404).json("No Courses Found "); //If no corresponding course is found then return with 404
    res.status(200).json(myCourses.courses); //ohterwise respond with the course
  } catch (err) {
    res.status(500).json("Something Went Wrong !!" + err);
  }
});

router.post("/", verifyToken, requireRole(["admin"]), async (req, res) => {
  //Create a new course (only admin can)
  const {name, category, price, details, img} = req.body;
  const _id = new mongoose.Types.ObjectId(); //generate unique object id for every data entry
  try {
    const creator = await User.findOne({email: req.user.email}); //to get the admin details who is creating the course
    const newCourse = new Course({
      _id,
      name,
      category,
      price,
      details,
      img,
      createdBy: creator._id,
    });
    await newCourse.save();
    res.status(200).json("Course Created Successfully");
  } catch (err) {
    res.status(500).json("Something Went Wrong !!");
  }
});

router.delete(
  "/:course_id",
  verifyToken,
  requireRole(["admin"]),
  async (req, res) => {
    //To delete the course by courseId
    const course_id = req.params.course_id;
    try {
      const course = await Course.findByIdAndDelete(course_id); //delete the course by finding its id
      if (!course) return res.status(404).json("Course Not Found"); //If no corresponding course is found then return with 404
      res.status(200).json("Course Deleted Successfully"); //ohterwise respond with the course
    } catch (err) {
      res.status(500).json("Something Went Wrong !!");
    }
  }
);

module.exports = router;
