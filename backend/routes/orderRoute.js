import { Router } from "express";
import {placeOrder,placeOrderWithStripe,placeOrderWithRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from "../middleware/auth.js";
const router=Router();

//admin features
router.post('list',adminAuth,allOrders);
router.post('/status',adminAuth,updateStatus)


//payment features
router.post('/place',authUser,placeOrder)
router.post('/stripe',authUser,placeOrderWithStripe)
router.post('/razorpay',authUser,placeOrderWithRazorpay)
//user features
router.post('/userorders',authUser,userOrders)


export default router;