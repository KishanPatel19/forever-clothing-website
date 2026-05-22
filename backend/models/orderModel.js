import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true,
        default:"Order Placed"

    },
    paymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type:Number,
        required:true
    },
    date:{
        type:Number,
        required:true
    }
},{timestamp:true})

const orderModel = mongoose.models.order ||mongoose.model("order",orderSchema);
export default orderModel;