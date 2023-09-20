const { check } = require('express-validator');
const path = require('path');

const createProductValidations = [
    check('title')
        .notEmpty().withMessage("debe completar el campo titulo").bail(),
    check('description')
        .notEmpty().withMessage("Debe agregar una descripción").bail(),
    check('category')
        .notEmpty().withMessage("debe agregar una categoria").bail(),
    check('price')
        .notEmpty().withMessage("debe agregar un precio").bail()
        .isNumeric().withMessage("el dato tiene que ser un numero").bail(),
    check('stock')
        .notEmpty().withMessage("debe agregar el stock").bail()
        .isNumeric().withMessage("el dato tiene que ser un numero").bail(),
    check('brands')
        .notEmpty().withMessage("debe agregar la marca del producto").bail(),
    check('images').custom((value, { req }) => {

        let files = req.files
        let acceptedExtensions = ['.jpg', '.png', '.jpeg']

        if (!files.length) {
            throw new Error('debes subir una imagen como minimo')
        } else {
            files.forEach((file) => {
                let fileExtension = path.extname(file.originalname)
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("Las extensiones aceptadas son " + acceptedExtensions.join(","));
                }
            })
        }
        return true
    })
]

module.exports = createProductValidations