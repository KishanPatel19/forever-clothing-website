import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

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

}

//function for RaZorpay paymentMethod
const placeOrderRazorpay = async(req,res)=>{

}

//function for All orders in Admin Panel
const allOrders = async(req,res)=>{

}

//function for orders in user side
const userOrders = async(req,res)=>{

}

//function for update the status of order
const updateStatus = async(req,res)=>{

}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}