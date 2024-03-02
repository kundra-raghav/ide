require('dotenv').config()
const express=require('express')
const app=express();
const connectDB=require('./db/connect')
// app.get('/',(req,res)=>{
//     res.send(`I am running`)
// })
const product_routes=require("./routes/products")
app.get('/',async(req,res)=>{
    res.send("Welcome to course api-- to render visit /api/products")
})
app.use("/api/products",product_routes)
const PORT=process.env.PORT || 5000;

const start= async()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log(`Running on port ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}
start()
