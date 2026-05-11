import { resend } from "../config/resend";

interface IUser {
    email: string;
    name: string;
    token: string
}

export class AuthEmail {
    static sendEmail = async (user: IUser) => {
        const { data, error } = await resend.emails.send({
            from: 'Uptask <onboarding@resend.dev>', // Cambia esto por tu dominio verificado
            to: [user.email],
            subject: 'Uptask - confirma tu cuenta',
            html: `
                <p>Hola, ${user.name}</p>
                <p>Te damos la bienvenida a UpTask, visita el siguiente enlace para confirmar tu cuenta:</p>
                <a href="${process.env.FRONTEND_URL}/confirmar-cuenta">Confirmar cuenta aquí</a>
                <p>Ingresa el siguiente código: <b>${user.token}</b></p>
                <p>Nota: el código expirará en 10 minutos.</p>
            `
        });

        if (error) {
            return console.error(error);
        }
        console.log('Email enviado con éxito', data?.id);
    }

    static sendPasswordResetCode = async (user: IUser) => {
        const { data, error } = await resend.emails.send({
            from: 'Uptask <onboarding@resend.dev>', // Cambia esto por tu dominio verificado
            to: [user.email],
            subject: 'Uptask - Restablecer contraseña',
            html: `
                <p>Hola, ${user.name}</p>
                <p>Para continuar con el proceso visita el siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/acceso/nueva-contrasena">Restablecer Contraseña</a>
                <p>Ingresa el siguiente código: <b>${user.token}</b></p>
                <p>Nota: el código expirará en 10 minutos.</p>
            `
        });

        if (error) {
            return console.error(error);
        }
        console.log('Email de reset enviado', data?.id);
    }
}