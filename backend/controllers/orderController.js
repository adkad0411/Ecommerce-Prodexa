import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe'
//gateway initialise
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//global variables
const currency='mad'
const deliveryCharges=10


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
    try{
        const {userId,items,amount,address}=request.body;
        const {origin}=request.headers
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        };
        const newOrder= new orderModel(orderData);
        await newOrder.save();

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data: {
                    name: item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges*100
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create(
            {
                success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items,
                mode:'payment'
            } 
        )
        return response.status(200).send({
            success:true,session_url:session.url
        })
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            message:error.message
        })
    }
}


//Verify Stripe
const verifyStripe=async(request,response)=>{
    const {orderId,success,userId}=request.body
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            return response.status(200).send({
                success:true,    
            })
        }else{
            await orderModel.findByIdAndDelete(orderId)
            return response.send({success:false})
        }
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            message:error.message
        })
    }
}





//all order data for admin panel;
const allOrders=async(request,response)=>{
    try{
        const orders=await orderModel.find()
        return response.status(200).send({
            success:true,
            orders
        });
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            message:error.message
        })
    }
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
const updateStatus=async(request,response)=>{
    try{
        const {orderId,status}=request.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        return response.status(200).send({
            success:true,
            message:'Status Updated'
        })
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            message:error.message
        })
    }
}
export {verifyStripe,placeOrder,placeOrderWithStripe,allOrders,userOrders,updateStatus}