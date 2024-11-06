const app = require("./app.js");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({path: "config/config.env"})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log(err.message);
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(4000,()=>{
    console.log("Server running on http://localhost:4000/");
})