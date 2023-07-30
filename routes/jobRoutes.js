const express = require("express");
const router = express.Router();
const jobs = require("../models/jobModel");
const User = require("../models/userModel");
const moment =  require("moment")



router.get("/getalljobs" , async (req,res) => {
    try {
        const job = await jobs.find();
        return res.status(200).json({
            job , 
            success : true,
            message : "succesfully fetch the jobs"
        })
        
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : "issue in finding the jobs"
        })
    }
});

router.post('/postjob' , async (req,res) => {
       
    try {
        const newjob = new jobs(req.body)
        await newjob.save();
        res.send('Job Posted Successfully')
    } catch (error) {
        return res.status(400).json({ error });
    }
})

router.post('/editjob' , async (req,res) => {
       
    try {
        const updatedJob = jobs.findOneAndUpdate({_id : req.body._id} , req.body);
        res.send("job updated succeffully");
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.post("/applyjob" , async (req,res) => {
    const {user , job} = req.body;

    try {
        const jobdetails = await jobs.findOne({_id : job._id});
        const appliedCandidate = {  

            userid : user._id,
            appliedDate : moment().format('MMM DD yyyy')

        }

        jobdetails.appliedCandidates.push(appliedCandidate);
        await jobdetails.save();

        const userDetails = await User.findOne({_id : user._id});

        const appliedJob = {
            jobid : job._id,
            appliedDate : moment().format('MMM DD yyyy')
        }
        
        userDetails.appliedJobs.push(appliedJob);

        await userDetails.save();

        res.send("job applied succesfully")

    } catch (error) {
        return res.status(400).json({ error });
    }
})

module.exports = router;