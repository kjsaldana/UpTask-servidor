import colors from "colors";
import mongoose from "mongoose";

// export async function connectDB() {
//     try {
//         const { connection } = await mongoose.connect(process.env.DATABASE_URL)
//         const url = `${connection.host}.${connection.port}`
//         console.log(colors.green.bold(`MongoDB conectado en: ${url}`))

//     } catch (error) {
//         console.log(colors.bgRed.bold('Error a conectarse a mongoDB'))
//         process.exit(1)
//     }
// }

export async function connectDB() {
    try {
        console.log("DATABASE_URL es:", process.env.DATABASE_URL ? "Existe" : "No definida");
        
        if(!process.env.DATABASE_URL) {
            throw new Error("La variable DATABASE_URL no está configurada");
        }

        const { connection } = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${connection.host}:${connection.port}`;
        console.log(colors.green.bold(`MongoDB conectado en: ${url}`));

    } catch (error) {
        console.log(colors.bgRed.bold('Error al conectarse a mongoDB'));
        console.log(error.message);
        process.exit(1);
    }
}