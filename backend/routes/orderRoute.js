import express from 'express'
import { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

//ROute for paymentMethod
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//Route for Admin
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Route for User Order
orderRouter.post('/userorders',authUser,userOrders);

//verify Stripe
orderRouter.post('/verifyStripe',authUser,verifyStripe);
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;
