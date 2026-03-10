import jwt from 'jsonwebtoken'
import 'dotenv/config';
export const authMiddleware = (req,res,next)=>{
    try {
        const header = req.headers.authorization

        if(!header){
            return res.status(401).json({success : false,message: "Token needed"})
        }

        const token = header.split(" ")[1]

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({success: false,message:"invalid token"})
    }
}