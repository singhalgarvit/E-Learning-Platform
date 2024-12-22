/*
    /api/purchase
*/

const express = require("express");
const router = express.Router();
const {verifyToken, requireRole} = require("../middlewares/auth");
const Course = require("../database/schema/course.schema");
const User = require("../database/schema/user.schema");
const {default: mongoose} = require("mongoose");
const hasPurchased = require("../middlewares/hasPurchased");

router.post("/", verifyToken, requireRole(["student"]),hasPurchased(false), async (req, res) => {
  const course_id = req.headers.course_id;
  try {
      await User.findOneAndUpdate(
        {email: req.user.email}, // Query: Find by email
        {$push: {courses: course_id}}, // Update: Add course to courses array
        {new: true}
      );
      res.status(200).json("Purchased Successfully ");
  } catch (err) {
    res.status(500).json("Something Went Wrong !!");
  }
});

module.exports = router;
