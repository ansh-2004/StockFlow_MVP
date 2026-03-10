import prisma from "../prisma/client.js";

export const createProduct = async(req,res)=>{
    try {
        const {name,sku,description,quantity,costPrice,sellingPrice,lowStockThreshold} = req.body 

        const product = await prisma.product.create({
            data : {
                name,
                sku,
                description,
                quantity : quantity || 0,
                costPrice,
                sellingPrice,
                lowStockThreshold,
                organizationId : req.user.organizationId
            }
        })
        console.log(product)

        res.status(201).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({messsage: error.messsage})
    }
}

export const getProducts = async(req,res)=>{
    try {
        const products = await prisma.product.findMany({
            where : {
                organizationId : req.user.organizationId
            }
        })

        res.json(products)
    } catch (error) {

        res.status(500).json({messsage: error.messsage})
        
    }
} 

export const getProductById = async (req, res) => {
  try {

    const { id } = req.params

    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
        organizationId: req.user.organizationId
      }
    })

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error"});
  }
};

export const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        const product = await prisma.product.update({
            where : {id : Number(id)},
            data : req.body 
        })

        res.json(product)
    } catch (error) {
        res.status(500).json({messsage: error.messsage})
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        await prisma.product.delete({
            where : {id : Number(id)}
        })

        res.json({messsage : "Product deleted"})
    } catch (error) {
        res.status(500).json({messsage: error.messsage})
    }
}