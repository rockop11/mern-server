const { check } = require('express-validator');
const path = require('path');

const registerValidations = [
    check('username')
        .notEmpty().withMessage('debe completar el campo username').bail()
        .isLength({ min: 5 }).withMessage('el username es muy corto').bail(),
    check('password')
        .notEmpty().withMessage('debe completar el campo contraseña').bail()
        .isLength({ min: 8 }).withMessage("la contraseña es muy corta").bail(),
    check('email')
        .notEmpty().withMessage('debe completar el campo email').bail()
        .isEmail().withMessage('debe ingresar un email valido').bail(),
    check("fullName")
        .notEmpty().withMessage('debe completar el campo nombre completo').bail(),
    check("tel")
        .notEmpty().withMessage('debe completar el campo telefono').bail()
        .isLength({ min: 10 }).withMessage('debe ingresar un numero de celular valido').bail(),
    check("isAdmin")
        .notEmpty().withMessage('debe completar el campo administrador').bail()
        .isBoolean().withMessage("debe completar el campo con verdadero o falso").bail(),
    check('image').custom((value, { req }) => {
        let file = req.file
        let acceptedExtensions = ['.jpg', '.png', '.jpeg']

        if (!file) {
            throw new Error('debes subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error("Las extensiones aceptadas son " + acceptedExtensions.join(","));
            }
        }
        return true
    })


]

module.exports = registerValidations