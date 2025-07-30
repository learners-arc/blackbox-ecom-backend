import express, { Express, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from "./routes";
import { config } from "dotenv";

// Load Environment variables
config();

const app: Express = express();

// Trust Proxy (important for rate limiting, IP detection)
app.set("trust proxy", 1);

// Health Check endpoint (before middleware)
app.get("/health",(req: Request,res: Response)=>{
    res.status(200).json({
        status: "OK",
        timeStamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
    });
});

// Body parsing middleware
app.use(
    express.json({
        limit: "10mb",
        type: (req) => {
            return !req.headers["content-type"]?.includes("multipart/form-data");
        }
    })
);
app.use(express.urlencoded({extended:true, limit:"10mb"}));

// Cookie parser
app.use(cookieParser());

// Compression middleware
app.use(compression());

// API Routes
app.use('/api/v1',router);

// Root endpoint
app.get('/',(req:Request, res:Response)=>{
    res.status(200).json({
        message: "BlackBox Commerce API",
        version: "1.0.0",
        documentation: "/docs",
        health: "/health",
        timeStamp: new Date().toISOString()
    });
});

export default app;
