
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
require("dotenv").config();


exports.login = async (req,res) => {
    
    try {
        //data fetch
        const {username , password} = req.body;
        //validation on email and password
        if(!username || !password){
            return res.status(400).json({
                success : false,
                message : "please fill all the details carefully"
            })
        }

        //check for redistered user

        let isExist = await user.findOne({username});

        if(!isExist){
            return res.status(401).json({
                success : false,
                message : "User is not registered"
            });
        }

        //if user is exist
        //payload for jwt token
        const payload = {
            username : user.username,
            id : user._id
        };

        //verify password and create jwt token

        if(await bcrypt.compare(password , isExist.password)){
            //password match
            //create jwt token , jwt req - payload , jwt key , expiry duration
            let token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "1year"});


        isExist = isExist.toObject();
        isExist.token = token;
        isExist.password = undefined;

        const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
        }

        res.cookie("JobCookie", token, options).status(200).json({
            success:true,
            token,
            isExist,
            message:'User Logged in successfully',
        });
        
    }else{
        //passwsord do not match
        return res.status(403).json({
            success:false,
            message:"Password Incorrect",
        });
    }


            
        } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });
    }
}