const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

    //personal info

    username : {type : String , default: ""},
    password : {type  :String , default: ""},

    FirstName : {type  :String , default: ""},
    LastName  : {type  :String , default: ""},

    email : {type  :String , default: ""},
    MobileNumber : {type  :Number ,default: "" },
    portfolio : {type  :String , default: "" },

    about : {type  :String , default: "" },
    address : {type  :String , default: "" },

    //skills and education
    //if for than one field is required the assign array

    education : {type : [] , default: ['']},
    skills : {type : [], default: ['']},
    projects : {type : [], default: ['']},
    experience : {type : [], default: ['']},

    //applied jobs

    appliedJobs : []


},{
    timestamps : true
})

const userModel = new mongoose.model("user" , userSchema);

module.exports = userModel;