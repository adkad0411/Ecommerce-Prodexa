import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';

//placing orders using cod Method
const placeOrder=async(request,response)=>{
    try{
        const {userId,items,amount,address}=request.body;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        };
        const newOrder= new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData: {}})
        return response.status(201).send({
            success:true,
            message: "Order Placed"
        })
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            message:error.message
        })
    }
}


//placing orders using stripe Method
const placeOrderWithStripe=async(request,response)=>{
    
}


//placing orders using razorpay Method
const placeOrderWithRazorpay=async(request,response)=>{
    
}



//all order data for admin panel;
const allOrders=async()=>{

}


//user order data for frontend
const userOrders=async(request,response)=>{
    try{
        const {userId}=request.body
        const orders=await orderModel.find({userId});
        return response.status(200).send({
            success:true,
            orders
        })
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            message:error.message
        })
    }
}

//update order Status from Admin Panel
const updateStatus=(request,response)=>{

}
export {placeOrder,placeOrderWithStripe,placeOrderWithRazorpay,allOrders,userOrders,updateStatus}