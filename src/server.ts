import express from "express";
import { connectDB } from "./config/db";
import dotenv from 'dotenv';
import projectRouter from "./routes/projectRoutes";
import authRouter from "./routes/authRoutes";
import corsOptions from "./config/cors";
import cors from "cors"
import morgan from "morgan";

dotenv.config()

connectDB()

const app = express()

app.use(cors(corsOptions))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)

export default app