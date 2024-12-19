import express from "express";
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'
import connectMongoDb from "./db/connect.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();



const Port = process.env.PORT || 5000;

app.use(express.json()); //to parse req body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(Port, () => {
   console.log(`server is running on this: ${Port}`);
   connectMongoDb();
})
