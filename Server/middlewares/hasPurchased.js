const User = require("../database/schema/user.schema");

const hasPurchased = (bool) => async (req, res, next) => {
  const course_id = req.headers.course_id;
  const getUser = await User.findOne({email: req.user.email});
  if (req.user.role === "admin") {
    next();
  }
  if (!getUser.courses.includes(course_id) && bool === false) {
    next();
  } else if (getUser.courses.includes(course_id) && bool === true) {
    next();
  } else if(getUser.courses.includes(course_id) && bool === false){
    res.status(409).json("Already Purchased");
  } else{
    res.status(401).json("Please Purchase This Course First");
  }
};

module.exports = hasPurchased;
