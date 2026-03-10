import prisma from "../prisma/client.js";

export const getSettings = async(req,res)=>{
    try {
        const organizationId = req.user.organizationId

        let settings = await prisma.settings.findUnique({
            where : {organizationId}
        })

        if(!settings){
            settings = await prisma.settings.create({
                data : {
                    organizationId,
                    defaultLowStockThreshold : 5
                }
            })
        }

        res.json(settings)

    } catch (error) {
        res.status(500).json({message : error.message})
    }

}

export const updateSettings = async (req,res)=>{
    try {
        const organizationId = req.user.organizationId

        const {defaultLowStockThreshold} = req.body 

        const settings = await prisma.settings.upsert({
            where : {organizationId},
            update : {defaultLowStockThreshold},
            create : {
                organizationId,
                defaultLowStockThreshold
            }
        })

        res.json(settings)

    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
}