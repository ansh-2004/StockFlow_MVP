import prisma from "../prisma/client.js"

export const getDashboardData = async (req,res)=>{
    try {
        const organizationId = req.user.organizationId 

        const totalProducts = await prisma.product.count({
            where : {organizationId}
        })

        const lowStockProducts = await prisma.product.count({
            where : {
                organizationId,
                quantity : {
                    lte : 5
                }
            }
        })

        const products = await prisma.product.findMany({
            where : {organizationId},
            select : {
                quantity : true ,
                sellingPrice : true 
            }
        })

        let totalStockValue = 0 

        products.forEach((p)=>{
            totalStockValue += (p.quantity || 0) * (p.sellingPrice || 0)
        })

        res.json({
            totalProducts,
            lowStockProducts,
            totalStockValue
        })
    } catch (error) {

        res.status(500).json({message : error.message})
        
    }
}