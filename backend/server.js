import express from "express"
import cors from "cors"
import dotenv from 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
//app config
const app=express();
//middleware
app.use(express.json());
app.use(cors())
const port=process.env.PORT||8080;
connectDB();
connectCloudinary();

//api end point
app.use('/api/user',userRoute);
app.use('/api/product',productRoute)
app.use('/api/cart',cartRouter)
app.listen(port,()=>{
    console.log('Server Running On port: ',port)
})