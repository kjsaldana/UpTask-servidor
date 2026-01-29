import dotenv from 'dotenv';
dotenv.config()

import { connectDB } from './config/db';
import server from './server';
import colors from 'colors';

const port = process.env.PORT || 4000

async function startServer() {
    await connectDB()
    server.listen(port, () => {
        console.log(colors.cyan.bold(`desde port ${port}`));
    })
}

startServer()