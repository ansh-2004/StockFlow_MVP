import prisma from "../prisma/client.js"

export const getDashboardData = async (req,res)=>{
    try {
        const organizationId = req.user.organizationId 

        const settings = await prisma.settings.findUnique({
            where : {organizationId}
        })

        const defaultThreshold = settings?.defaultLowStockThreshold || 5 


        const totalProducts = await prisma.product.count({
            where : {organizationId}
        })

        const products = await prisma.product.findMany({
            where : {organizationId},
            select : {
                id: true,
                name : true,
                sku : true,
                quantity : true ,
                lowStockThreshold : true 
            }
        })


        const totalQuantity = products.reduce(
            (sum,p) => sum + (p.quantity || 0),0
        )

        // const lowStockItems = products.filter((p)=>{
        //     const threshold = p.lowStockThreshold ?? defaultThreshold
        //     return p.quantity <= threshold
            
        // })


        const lowStockItems = products.map((p) => {
                const threshold = p.lowStockThreshold ?? settings.defaultLowStockThreshold

                if (p.quantity <= threshold) {
                    return {
                        name: p.name,
                        sku: p.sku,
                        quantity: p.quantity,
                        threshold
                    };
                    }

                    return null;
                })
                .filter(Boolean);        


        res.json({
            totalProducts,
            totalQuantity,
            lowStockItems
        })
    } catch (error) {

        res.status(500).json({message : error.message})
        
    }
}