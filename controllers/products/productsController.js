const Product = require("../../models/Product")
const { validationResult } = require('express-validator');
const { uploadProductImages, deleteProductImages, getProductsImages } = require('../../firebase')

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

        const { title, description, category, price, stock, discount, brands, condition } = req.body
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
            condition: condition
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
        try {
            //returns the list with all the products.
            const productsList = await Product.find()

            res.status(200).json({
                length: productsList.length,
                data: productsList,
            })
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }

    },

    productsListByBrands: async (req, res) => {
        try {
            //returns a list of products by brands
            const { brand } = req.params


            const response = await Product.find(
                { brands: { $elemMatch: { brand: `${brand}` } } }
            )

            res.status(200).json({
                length: response.length,
                data: response
            })
        } catch (err) {
            res.status(500).json({
                message: err.message,
            })
        }
    },

    productDetail: async (req, res) => {
        try {
            //returns the product detail by id
            const { id } = req.params

            const productDetail = await Product.findById(id)
            const images = await getProductsImages(id)

            res.status(200).json({
                images: images,
                data: productDetail
            })
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    },

    editProduct: async (req, res) => {
        try {
            const { id } = req.params
            const { brands } = req.body

            const brandNames = []

            brands.map((brand) => {
                brandNames.push({ brand: brand })
            })

            const response = await Product.updateOne({ _id: id }, {
                $set: req.body,
                $set: { brands: brandNames }
            })

            res.status(200).json({
                message: `Acabas de Editar el producto con id: ${id}`
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },

    deleteProduct: async (req, res) => {
        try {
            //deletes a product by ID, and the images in firestore
            const { id } = req.params

            const { images } = await Product.findById(id)

            images.map((image) => {
                deleteProductImages(id, image.name)
            })

            await Product.findByIdAndDelete(id)

            res.status(200).json({
                message: `Se borro el Producto con ID: ${id}`,
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }

    },
}

module.exports = productController;