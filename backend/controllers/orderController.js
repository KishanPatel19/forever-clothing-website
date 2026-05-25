import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

//globle variables
const currency = 'inr'
const deliveryCharge = 10

//function for COD paymentMethod
const placeOrder = async (req,res)=>{
    try {
       const {userId,items,amount,address} = req.body;
       
       const orderData = {
        userId:userId,
        items:items,
        amount:amount,
        address:address,
        payment:false,
        paymentMethod:"COD",
        date:Date.now()
       }
       const newOrder = new orderModel(orderData)
       await newOrder.save()

       await userModel.findByIdAndUpdate(userId,{cartData:{}});

       res.json({success:true,message:"Order Placed"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//function for Stripe paymentMethod
const placeOrderStripe = async(req,res)=>{

    try {
         const {userId,items,amount,address} = req.body;

    const orderData = {
        userId,
        items,
        amount,
        address,
        payment:false,
        paymentMethod:"Stripe",
        date: Date.now()
    }
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:"Delivery Fee"
            },
            unit_amount:deliveryCharge*100
        },
        quantity:1
    })

    const session = await stripe.checkout.sessions.create({
        success_url:`http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
    })
    res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
   
}

//verify Stripe 
const verifyStripe = async(req,res)=>{
    try {
        const {orderId,userId,success} = req.body;
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true,message:"Payment Done"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment Failed"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//function for RaZorpay paymentMethod
const placeOrderRazorpay = async(req,res)=>{
    
    const {userId,items,amount,address} = req.body;

    const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod:"Razorpay",
        payment:false,
        date: Date.now()

    }
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
        amount: amount*100,
        currency:currency.toUpperCase(),
        receipt:newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
            console.log(error);
            res.json({success:false,message:error})
         }
         res.json({success:true,order})
    })
}

const verifyRazorpay = async(req,res) =>{

  try {
      const {userId,razorpay_order_id} = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo)
    if(orderInfo.status === "paid"){
    await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
    await userModel.findByIdAndUpdate(userId,{payment:true});
    res.json({success:true,message:"Payment Successfull"})
    }else{
        res.json({success:false,message:"Payment Failed"})
    }
  } catch (error) {
     console.log(error);
        res.json({success:false,message:error.message})
  }
}

//function for All orders in Admin Panel
const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
    
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for orders in user side
const userOrders = async(req,res)=>{
    try {
        
        const userId = req.body.userId;
       
        const orders = await orderModel.find({userId });
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//function for update the status of order
const updateStatus = async(req,res)=>{
    try {
         const {orderId} = req.body;
        
         const {status} = req.body;
         console.log(status)
         console.log(orderId)
         

         await orderModel.findByIdAndUpdate(orderId,{status})
         res.json({success:true,message:"Status Updated "})
    } catch (error) {
             console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay,verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}