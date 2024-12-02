import express from "express";
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'
import connectMongoDb from "./db/connect.js";


const app = express();
dotenv.config();



const Port = process.env.PORT || 5000;



app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.listen(Port, () => {
   console.log(`server is running on this: ${Port}`);
   connectMongoDb();
})
