import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];

        // Trabajar en local con dev:api args desde package.json
        // if (process.argv[2] === '--api') {
        //     whitelist.push(undefined)
        // }

        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("conexion no permitida"));
        }
    }
}

export default corsOptions;