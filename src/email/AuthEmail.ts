import { transporter } from "../config/nodemailer";

interface IUser {
    email: string;
    name: string;
    token: string
}

export class AuthEmail {
    static sendEmail = async (user: IUser) => {
        const info = await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - confirma tu cuenta',
            text: 'Uptask - confirma tu cuenta',
            html: `
                <p>Hola, ${user.name}</p>
                <p>Te damos la bienvenida a UpTask, vistita el siguiente enlace para confirmar tu cuenta:</p>
                <a href="${process.env.FRONTEND_URL}/confirmar-cuenta">Confirmar cuenta aquí</a>
                <p>Ingresa el siguiente código: <b>${user.token}</b></p>
                <p>Nota: el código expirará en 10 minutos.</p>
            `
        })
        console.log('Enviado', info.messageId);
    }

    static sendPasswordResetCode = async (user: IUser) => {
        const info = await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - Restablecer contraseña',
            text: 'Uptask - Restablecer contraseña',
            html: `
                <p>Hola, ${user.name}</p>
                <p>Para continuar con el proceso vistita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/acceso/nueva-contrasena">Restablecer Contraseña</a>
                <p>Ingresa el siguiente código: <b>${user.token}</b></p>
                <p>Nota: el código expirará en 10 minutos.</p>
            `
        })
        console.log('Enviado', info.messageId);
    }
}
