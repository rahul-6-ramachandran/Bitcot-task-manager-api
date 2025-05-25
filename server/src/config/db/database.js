import mongoose from 'mongoose'

export const connectDB = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch((err)=>{
        console.error(err)
    })
}