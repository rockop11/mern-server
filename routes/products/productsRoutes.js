const express = require("express")
const router = express.Router()
const upload = require('../../middlewares/multer')
const productController = require('../../controllers/products/productsController')
//validations
const verifyToken = require("../../middlewares/verifyToken")
const createProductValidations = require("../../middlewares/validations/products/createProductValidation")

const { createProduct, productsList } = productController

router.post(
    "/create-product",
    upload.any("images"),
    verifyToken,
    createProductValidations,
    createProduct
)

router.get("/products-list", productsList)

module.exports = router