const express = require('express')
const app = express()
const dotenv= require("dotenv")
const path = require('path')
const env = require("process")
const cors = require('cors')
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

dotenv.config({path:path.join(__dirname,"config","config.env")})
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", // Set to your frontend URL
  credentials: true, // Allow credentials (cookies)
}));
app.use(cookieParser());



dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SEC,
});

const connectdatabase=require('./config/connectDatabase')
connectdatabase()

const router= require('./routes')
app.use("/api/v1",router)


app.listen(process.env.PORT,()=>{
    console.log(`server listening to ${process.env.PORT} in ${process.env.NODE_ENV}`);
    
})