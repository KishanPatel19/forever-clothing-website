import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config 
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//Middlesware 
app.use(express.json())
app.use(cors())


//create endpoints

//endpoint for user
app.use('/api/user',userRouter);

//endpoint for product
app.use('/api/product',productRouter);

//endpoints for cart
app.use('/api/cart',cartRouter)

//endpoint for orders
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API is working")
})

//start server
app.listen(port,()=>{
    console.log("server is running on port :",+port)
})

