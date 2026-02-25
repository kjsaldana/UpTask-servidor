import express, { Express } from "express";
import projectRouter from "./routes/projectRoutes";
import authRouter from "./routes/authRoutes";
import corsOptions from "./config/cors";
import cors from "cors"
import morgan from "morgan";

const app: Express = express()

app.use(cors(corsOptions))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)

app.get('/', (req, res) => {
    res.send('Connection success');
});

export default app