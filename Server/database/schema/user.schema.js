const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
    enum: ["student", "admin", "instructor"],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
