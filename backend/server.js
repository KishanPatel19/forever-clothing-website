import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// App config 
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//Middlesware 
app.use(express.json())
app.use(cors())


//create endpoints
app.get('/',(req,res)=>{
    res.send("API is working")
})

//start server
app.listen(port,()=>{
    console.log("server is running on port :",+port)
})

