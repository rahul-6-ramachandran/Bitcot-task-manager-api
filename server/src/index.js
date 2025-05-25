// imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoute } from './routes/index.js'

dotenv.configDotenv()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes



const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.json({message:"Hey"})
})

app.use('/api/user',authRoute)

app.listen(PORT, ()=>{
  console.log(`Successfully running in ${PORT} `)
})
