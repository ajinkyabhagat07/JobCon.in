const express = require("express");

//create a router object

const router = express.Router();

const {login}  = require("../controllers/login");
const {register} = require("../controllers/register");
const {forgotPassword} = require("../controllers/forgotPassword");
const { updateUser } = require("../controllers/updateUser");
const Users = require("../models/userModel");

//registration route

router.post("/register" , register);

//login route

router.post("/login" , login);



//forgot password route

router.post("/forgotPassword" , forgotPassword);

//update user information
router.post("/update" , updateUser);


router.get("/getallusers" , async (req,res) => {
    try {
        const users = await Users.find();
        return res.status(200).json({
             users, 
            success : true,
            message : "succesfully fetch the users"
        })
        
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : "issue in finding the jobs"
        })
    }
});


module.exports = router;