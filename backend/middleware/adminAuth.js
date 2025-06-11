import jwt from 'jsonwebtoken'

const adminAuth=async(request,response,next)=>{
    try{
        const {token}=request.headers
        if(!token){
            throw new Error("Not Authorized Login Again")
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            throw new Error("Not Authorized Login Again")
        }
        next()
    }catch(error){
        if(error.messsage==="Not Authorized Login Again"){
            return response.status(403).send({
                success:false,
                error:true,
                message:error.message
            })
        }
        return response.status(500).send({
            success:false,
            error:true,
            message: error.message || "Internal Server Error"
        })
    }
}

export default adminAuth;