//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth_route.js";
import messageRoutes from "./routes/message_route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { app,server} from "./lib/socket.js";
import path from "path";



dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); //to extract json data from body
app.use(cookieParser());

app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log("Server is running on port: "+PORT);
    connectDB();
});