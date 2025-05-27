// imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// middleware imports
import { limiter } from './middlewares/index.js'

// Module Imports
import { authRoute, taskRoute } from './routes/index.js'
import { connectDB } from './config/db/database.js'


dotenv.configDotenv()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(limiter)


const PORT = process.env.PORT

// DB Connection
connectDB()

app.get('/',(req,res)=>{
    res.json({message:"Hey"})
})

// routes 
app.use('/api/user',authRoute)
app.use('/api/task',taskRoute)

// Errorhandling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error : "Something Went Wrong , Please Try again later"});
});

app.listen(PORT, ()=>{
  console.log(`Successfully running in ${PORT} `)
})
