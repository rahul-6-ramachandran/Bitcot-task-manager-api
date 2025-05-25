// imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoute } from './routes/index.js'
import { connectDB } from './config/db/database.js'

dotenv.configDotenv()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT

// DB Connection
connectDB()

app.get('/',(req,res)=>{
    res.json({message:"Hey"})
})

// routes 
app.use('/api/user',authRoute)

app.listen(PORT, ()=>{
  console.log(`Successfully running in ${PORT} `)
})
