const User = require('../database/schema/user.schema')

//this middleware function work for both login and signup depends on the param passed to the userExist function
//While Making route for the login page we have to check that user must be registered already then we need userExist to be true.
//On the other hand while making signup page we want that user must be new Thus userExist should be false.

const userExist = (bool) =>async(req,res,next)=>{
    const {email} = req.body;                               //extract the email from request body
    const isUser = await User.findOne({email:email});       //Find the user based on the email id. 
    if(isUser && bool == true){                             //This is the logic for Login the User if User exist and boolean is passed true it will be true;
        req.savedPassword = isUser.password;                //Add the database saved password to request so that we can verify the user entered password to the database password.
        req.savedName = isUser.name;
        req.savedRole = isUser.role;
        next();
    }
    else if(!isUser && bool == false){                      //This is the logic for Signup the User if User doesn't exist and boolean is passed false it will be true;
        next();
    }
    else if(isUser && bool == false){                       //if user exist already but the user has made signup request;
        res.status(409).json("User with this Email is Already exist Please Login to continue")
    }
    else{                                                   //if user does not exist but the user has made login request;
        res.status(404).json("User not found with this Email");
    }
}

module.exports = userExist