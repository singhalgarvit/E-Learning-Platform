/*
    /api/purchase
*/

const express = require("express");
const router = express.Router();
const {verifyToken, requireRole} = require("../middlewares/auth");
const Course = require("../database/schema/course.schema");
const User = require("../database/schema/user.schema");
const Order = require("../database/schema/order.schema");
const {default: mongoose} = require("mongoose");
const hasPurchased = require("../middlewares/hasPurchased");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.rzp_key_id,
  key_secret: process.env.rzp_key_secret,
});

// router.post("/",verifyToken,requireRole(["student"]),hasPurchased(false),async (req, res) => {
//     const course_id = req.headers.course_id;
//     try {
//       await User.findOneAndUpdate(
//         {email: req.user.email}, // Query: Find by email
//         {$push: {courses: course_id}}, // Update: Add course to courses array
//         {new: true}
//       );
//       res.status(200).json("Purchased Successfully ");
//     } catch (err) {
//       res.status(500).json("Something Went Wrong !!");
//     }
//   }
// );

router.post("/create-order",verifyToken,requireRole(["student"]),hasPurchased(false),async (req, res) => {
    try {
      const {amount, currency, receipt, notes} = req.body;
      const course_id = req.headers.course_id;
      

      const options = {
        amount: amount * 100, // Convert amount to paise
        currency,
        receipt,
        notes,
      };

      const order = await razorpay.orders.create(options);

      // Read current orders, add new order, and write back to the database
      const newOrder = new Order({
        order_id: order.id,
        amount: order.amount,
        receipt: order.receipt,
        status: "created",
        user:req.user.email,
        course:course_id
      })
      await newOrder.save();

      res.status(200).json(order); // Send order details to frontend, including order ID
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating order");
    }
  }
);


router.post("/verify-payment",async (req,res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


  const secret = razorpay.key_secret;
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  try {
    const isValidSignature = Razorpay.validateWebhookSignature(body, razorpay_signature, secret);
    if (isValidSignature) {
      // Update the order with payment details
      const order =await Order.findOne({order_id:razorpay_order_id});
      if (order) {
        await User.findOneAndUpdate(
          {email: order.user}, // Query: Find by email
          {$push: {courses: order.course}}, // Update: Add course to courses array
          {new: true}
        );
        await Order.findOneAndUpdate(
          {order_id:razorpay_order_id },
          { $set: { status:"paid", payment_id:razorpay_payment_id } },
          { returnDocument: 'after' } 
      );
      }
      res.status(200).json({message:"Purchased Successfully",status:"ok"});
      console.log("Payment verification successful");
    } else {
      res.status(400).json({ status: 'verification_failed' });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error verifying payment' });
  }
})

module.exports = router;
