import 'dotenv/config';
import prisma from "../prisma/client.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async(req,res)=>{
    try {
        const {email,password,organizationName} = req.body 

        if(!email || !password || !organizationName){
            return res.status(400).json({success : false,message : "All fields are mandatory"})
        }

        const userExist = await prisma.user.findUnique({where : {email}})

        if(userExist){
            return res.status(400).json({success : false,message : "User already exist"})
        }

        const hash = await bcrypt.hash(password,10)

        const org = await prisma.organization.create({
            data : {
                name : organizationName
            }
        })

        const user = await prisma.user.create({
            data :{
                email,
                password : hash,
                organizationId : org.id
            }
        })

        const token = jwt.sign(
            {userId : user.id, organizationId : org.id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.json({token})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

export const login = async(req,res) =>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success : false,message : "All fields are mandatory"})
        }

        const user = await prisma.user.findUnique({where: {email}})
       
        if(!user) return res.status(401).json({success : false ,message: "Invalid credentials"})

        const match = await bcrypt.compare(password,user.password)

        if(!match) return res.status(401).json({success : false, message : "Invalid credentials"})

        const token = jwt.sign(
            {userId : user.id, organizationId : user.organizationId},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )        
        
        res.json({token})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}