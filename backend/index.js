import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "https://chatify-frontend-new.onrender.com",
    credentials: true
}));

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/message",messageRouter);

server.listen(port,() => {
    console.log("SERVER STARTED AT",port);
    connectDB();
});
