const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.dbLink;

mongoose.connect(db).then(()=>{
    console.log("database connected")
}).catch(()=>{
 console.log("unable to connect to database")
});
