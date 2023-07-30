const { Mongoose, default: mongoose } = require("mongoose");

require("dotenv").config();


exports.dbconnect = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser : true,
        useUnifiedTopology : true
        
    })
    .then(() => {console.log("db connected succefully")})
    .catch((error) => {console.log("db connection issue");
     console.error(error);
     process.exit(1);
} )
}


