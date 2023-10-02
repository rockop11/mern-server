const Product = require("../../models/Product")
const { validationResult } = require('express-validator');
const { uploadProductImages } = require('../../firebase')

const productController = {
    createProduct: async (req, res) => {
        const { errors } = validationResult(req)

        if (errors.length) {
            res.status(400).json({
                message: "completar campos incompletos",
                errors: errors
            })
            return
        }

        const { title, description, category, price, stock, discount, brands } = req.body
        const { files } = req

        

        //creamos el array vacio para armar el objeto para mongoDB, con las props.
        const imageNames = []
        const brandNames = []

        brands.map((brandName) => {
            brandNames.push({ brand: brandName })
        })

        files.map((file) => {
            imageNames.push({ name: file.originalname })
        })

        const newProduct = Product({
            title: title,
            description: description,
            category: category,
            brands: brandNames,
            images: imageNames,
            price: price,
            discount: discount,
            stock: stock,
        })

        await newProduct.save()
            .then((data) => {
                res.status(200).json({
                    message: "Producto Creado!!!",
                    data: data
                })
            })
            .catch((err) => {
                res.json({
                    message: "Hubo un Error al crear un producto",
                    error: err
                })
            })
        await uploadProductImages(newProduct._id, files)
    },

    productsList: async (req, res) => {

        const productsList = await Product.find()

        res.status(200).json({
            data: productsList,
            length: productsList.length
        })
    }
}

module.exports = productController;