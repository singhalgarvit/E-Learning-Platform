const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {                                     //middleware to verify the JWT token
  const token = req.headers.token;                                            //get the token from headers
  const jwtSecret=process.env.jwt_Secret_key;
  if (!token) return res.status(401).json('Access denied : Token Not Found');  //if No token found in header then return

  try {
    const decoded = jwt.verify(token, jwtSecret);                             //verify the JWT Token and decode its value
    req.user = decoded;                                                       //add the decoded user object to req
    next();                                                                   //call next
  } catch (err) {
    res.status(403).json('Invalid token');                                     // if token is not validated
  }
};

const requireRole = (roles) => (req, res, next) => {                          //it is the middleware to check which user role has access to that route
  if (!roles.some((role) => req.user.role == role)) {                         //if required role is not found in the token role(the role we got from the frontend token)
    return res.status(403).json('Forbidden : You have not rights to access this'); //then return the function
  }
  next();                                                                       //otherwise call next
};

module.exports = { verifyToken, requireRole };
