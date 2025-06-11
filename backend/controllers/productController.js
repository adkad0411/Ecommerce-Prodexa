import {v2 as cloudinary} from "cloudinary"
import productModel from '../models/productModel.js'
//function for add product
const addProduct=async(request,response)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestseller}=request.body;
        const files=request?.files || {}
        console.log("files:",files)
        const image1=files.image1 && files.image1[0]
        const image2=files.image2 && files.image2[0]
        const image3=files.image3 && files.image3[0]
        const image4=files.image4 && files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item !==undefined);
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller==="true"?true:false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData)
        const product=new productModel(productData);
        await product.save()
        return response.status(201).send({
            success:true,
            error:false,
            message:"Product Added"
        })
    }catch(error){
        return response.status(500).send({
            success:false,
            error:true,
            message:error.message || "Internal Server Error"
        })
    }
}

//function for list product
const listProduct=async(request,response)=>{
    try{
        const products= await productModel.find({});
        return response.status(200).send({
            success:true,
            error:false,
            products
        })
    }catch(error){
        return response.status(500).send({
            success:false,
            error:true,
            message:error.message || "Internal Server Error"
        })
    }
}


//function for remove product
const removeProduct=async(request,response)=>{
    try{
        const {id}=request.body;
        const deletedProduct=await productModel.findByIdAndDelete(id);
        return response.status(200).send({
            success:true,
            error:false,
            message: "Product deleted succesfully"
        })
    }catch(error){
        console.log(error)
        return response.status(500).send({
            success:false,
            error:true,
            message: "Product Removed"
        })
    }
}

//function for asigle product info
const singleProduct=async(request,response)=>{
    try{
        const {id}=request.body;
        const product=await productModel.findById(id);
        return response.status(200).send({
            success:true,
            error:false,
            data: product
        })
    }catch(error){
        return response.status(500).send({
            success:false,
            error:true,
            message: error.message || "Internal Server Error"
        })
    }
}

export {addProduct,listProduct,removeProduct,singleProduct}