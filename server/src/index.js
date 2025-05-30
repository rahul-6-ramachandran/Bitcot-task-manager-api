// imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// middleware imports
import { limiter } from './middlewares/index.js'

// Module Imports
import { authRoute, logRoute, taskRoute } from './routes/index.js'
import { connectDB } from './config/db/database.js'
import esClient, { runElasticClient } from './config/elasticSearch/elasticClient.js'
import { handleError } from './middlewares/errorHandling.js'
import { swaggerOptions } from './utils/swagger.js';


dotenv.configDotenv()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(limiter)



const PORT = process.env.PORT || 2255

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// DB Connection
connectDB()

// ElasticSearch Connection
runElasticClient()

app.get('/',(req,res)=>{
    res.json({message:"Hey"})
})



// routes 
app.use('/api/user',authRoute)
app.use('/api/task',taskRoute)
app.use('/api/logs',logRoute)

// Errorhandling Middleware
app.use(handleError);

app.listen(PORT, ()=>{
  console.log(`Successfully running in ${PORT} `)
})
