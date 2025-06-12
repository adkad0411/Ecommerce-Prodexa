import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

//rooute for user login
const loginUser=async(request,response)=>{
    try{
        const {email,password}=request.body;
        const user=await userModel.findOne({email});
        if(!user){
            throw new Error("User doesn't exist!")
        }
        const isMatchPassword=await bcrypt.compare(password,user.password);
        if(!isMatchPassword){
            throw new Error("Invalid credentials!")
        }
        const token=createToken(user._id);
        return response.status(200).send({
            success:true,
            error:false,
            token
        })
    }catch(error){
        if(error.message==="User doesn't exist!"){
            return response.status(404).send({
                success:false,
                error:true,
                message:error.message
            })
        }
        if(error.message==="Invalid credentials!"){
            return response.status(400).send({
                success:false,
                error:true,
                message:error.message
            })
        }
        return response.status(500).send({
            success:false,
            error:true,
            message:error || error?.message || "Internal server Error"
        })

    }
}


//route for user registration
const registerUser=async(request,response)=>{
    try{
        const {name,email,password}=request.body;
        //checking user already exists or not!
        const exists=await userModel.findOne({email});
        if(exists){
            throw new Error("User already exists!")
        }
        //validation email format & strong password
        if(!validator.isEmail(email)){
            throw new Error("Please Enter a valid Email!")
        }
        if(password.length <8){
            throw new Error("Please Enter a strong password!")
        }
        //hashing password
        const hashPassword=await bcrypt.hash(password,10);
        //create new user
        const newUser=new userModel({name,email,password:hashPassword});
        const user=await newUser.save();
        //generate token
        const token=createToken(user._id)
        return response.status(201).send({
            success:true,
            error:false,
            token
        })
    }catch(error){
        console.log(error)
        if(error.message==="User already exists!"){
            return response.status(409).send({
                success:false,
                error:true,
                message:error.message
            })
        }
        if(error.message==="Please Enter a valid Email!" || error.message==="Please Enter a strong password!"){
            return response.status(400).send({
                success:false,
                error:true,
                message:error.message
            })
        }
        return response.status(500).send({
            success:false,
            error:true,
            message:error||error?.message || "Internal Server Error"
        });
    }
}

//route for admin Login

const adminLogin=async(request,response)=>{
    try{
        const {email,password}=request.body;
        if(email===process.env.ADMIN_EMAIL &&  password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET_KEY);
            return response.status(200).send({
                success:true,
                error:false,
                token,
                message:"Admin Logged In Succesfully"
            })
            }else{
                throw new Error("Invalid credentials")
            }
    }catch(error){
        if(error.message==="Invalid credentials"){
            return response.status(400).send({
                success:false,
                error:true,
                message:error.message
            })
        }
        return response.status(500).send({
            success:false,
            error:true,
            message: "Internal Server Error"
        })
    }
}



export {loginUser,registerUser,adminLogin}