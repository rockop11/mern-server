const express = require("express")
const router = express.Router()
const upload = require('../../middlewares/multer')
const productController = require('../../controllers/products/productsController')
//validations
const verifyToken = require("../../middlewares/verifyToken")
const createProductValidations = require("../../middlewares/validations/products/createProductValidation")

const { createProduct } = productController

router.post("/create-product", upload.array("images"), verifyToken, createProductValidations, createProduct)

module.exports = router