import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { handdleInputErrors } from "../middleware/validator";
import { body, param } from "express-validator";
import { autenticate } from "../middleware/auth";

const router: Router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').isLength({ min: 8 }).withMessage('Contraseña debe tener 8 caracteres como min.'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas deben coincidir')
        }
        return true
    }),
    body('email').isEmail().withMessage('email no válido.'),
    handdleInputErrors,
    AuthController.createAccount
)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('El token no puede ir vacío.'),
    handdleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email').isEmail().withMessage('email no válido.'),
    body('password').notEmpty().withMessage('Contraseña es obligatoria.'),
    handdleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email').isEmail().withMessage('email no válido.'),
    handdleInputErrors,
    AuthController.requestCode
)

router.post('/forgot-password',
    body('email').isEmail().withMessage('email no válido.'),
    handdleInputErrors,
    AuthController.resetPassword
)

router.post('/validate-token',
    body('token').notEmpty().withMessage('El token no puede ir vacío.'),
    handdleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token').notEmpty().withMessage('El token no puede ir vacío.'),
    body('password').isLength({ min: 8 }).withMessage('Contraseña debe tener 8 caracteres como min.'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas deben coincidir')
        }
        return true
    }),
    handdleInputErrors,
    AuthController.updatePassword
)

// User

router.get('/user',
    autenticate,
    AuthController.getUser
)

// Profile

router.put('/profile',
    autenticate,
    body('name').notEmpty().withMessage('No puede ir vacío.'),
    body('email').isEmail().withMessage('email no válido.'),
    handdleInputErrors,
    AuthController.updateProfile
)

router.post('/update-password',
    autenticate,
    body('current_password').notEmpty().withMessage('Contraseña actual obligatoria.'),
    body('password').isLength({ min: 8 }).withMessage('Contraseña debe tener 8 caracteres como min.'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas deben coincidir')
        }
        return true
    }),
    handdleInputErrors,
    AuthController.updateCurrentUserPassword
)

router.post('/check-password',
    autenticate,
    body('password').notEmpty().withMessage('Contraseña obligatoria.'),
    handdleInputErrors,
    AuthController.checkPassword
)

export default router