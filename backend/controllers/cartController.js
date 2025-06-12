import userModel from "../models/userModel.js";

//add product to user Cart
const addToCart=async(request,response)=>{
    try{
        const {userId,itemId,size}=request.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await userModel.findByIdAndUpdate(userId,{cartData})
        return response.status(201).send({
            success:true,
            error:false,
            message: "Added To Cart"
        })
    }catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            error:true,
            message: error.message
        })
    }
}

//update user Cart
const updateCart=async(request,response)=>{
    try{
        const {userId,itemId,size,quantity}=request.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData})
        return response.status(201).send({
            success:true,
            error:false,
            message: "Cart Updated"
        })
    }catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            error:true,
            message: error.message
        })
    }
}


//get user cart data
const getUserCart=async(request,response)=>{
    try{
        const {userId}=request.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData
        return response.status(201).send({
            success:true,
            error:false,
            cartData
        })
    }catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            error:true,
            message: error.message
        })
    }
}

export {addToCart,updateCart,getUserCart}