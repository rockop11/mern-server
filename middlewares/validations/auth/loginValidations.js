const { body } = require('express-validator');

const loginValidations = [
    body('email')
        .notEmpty().withMessage("debe completar el campo email").bail()
        .isEmail().withMessage("debe ingresar un email valido").bail(),
    body('password')
        .notEmpty().withMessage("debe completar el campo password").bail()
        .isLength({ min: 8 }).withMessage("la contraseña debe tener minimo 8 caracteres").bail()
]

module.exports = loginValidations