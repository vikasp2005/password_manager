import express from "express";
import dotenv from "dotenv";

import {connectDB} from "./db/connectDB.js";

import authRouter from "./routes/auth.route.js";

dotenv.config({path:"../.env"});

const app = express();

const PORT = process.env.port || 5000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.end("hello");
})

app.use('/auth',authRouter);


app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on the port ${PORT}`);
})