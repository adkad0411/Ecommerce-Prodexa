import jwt from 'jsonwebtoken'

const authUser=async(request,response,next)=>{
    const {token}=request.headers;
    if(!token){
        return response.status(403).send({
            success:false,
            error:true,
            message:'Not Authorized Login Again'
        })
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        request.body.userId=token_decode.id;
        next()
    }catch(error){
        console.log(error);
        return response.status(500).send({
            success:false,
            error:true,
            message:error.message
        })
        
    }
}

export default authUser;