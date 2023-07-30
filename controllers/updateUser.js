const user = require("../models/userModel");


exports.updateUser = async (req,res) => {

    try {
        await user.findOneAndUpdate({_id : req.body._id} , req.body);

        const isExist = await user.findOne({_id : req.body._id});

        return res.status(200).json({
            isExist,
            success:true,
            message:'User updated Successfully',
        });

    
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error in updating the user details",
        });
    }

}