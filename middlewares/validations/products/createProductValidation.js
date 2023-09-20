const { check } = require('express-validator');

const createProductValidations = [
    check('title')
        .notEmpty().withMessage("debe completar el campo titulo").bail()
        // .isEmail().withMessage("debe ingresar un email valido").bail(),
    
]

module.exports = createProductValidations


// title: String,
//     description: String,
//         category: String,
//             brands: [{ brand: String }],
//                 images: [{ name: String }],
//                     price: Number,
//                         discount: Number,
//                             stock: Number,