const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();


//signup route handler
exports.register = async (req,res) => {
    try{
        //get data
        const {FirstName,LastName,username,email,password} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error inn hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            FirstName,LastName,username,email,password:hashedPassword
        })
        await user.save();

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}


