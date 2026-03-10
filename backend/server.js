import express from 'express'
import cors from 'cors'

import 'dotenv/config';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'


const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({
  origin: "https://stock-flow-mvp-rust.vercel.app",
  credentials: true
}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("StockFlow api running")
})

app.use('/auth',authRoutes)
app.use('/products',productRoutes)
app.use('/dashboard',dashboardRoutes)
app.use('/settings',settingsRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})