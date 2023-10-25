const express = require("express")
const router = express.Router()
const upload = require('../../middlewares/multer')
const productController = require('../../controllers/products/productsController')
//validations
const verifyToken = require("../../middlewares/verifyToken")
const createProductValidations = require("../../middlewares/validations/products/createProductValidation")

const { createProduct,
    productsList,
    productsListByBrands,
    productDetail,
    editProduct,
    deleteProduct
} = productController

router.post(
    "/create-product",
    upload.any("images"),
    verifyToken,
    createProductValidations,
    createProduct
)

router.get("/products-list", productsList)

router.get("/brands/:brand", productsListByBrands)

router.get("/detail/:id", productDetail)

router.put("/edit/:id", upload.any("images"), editProduct)

router.delete("/delete-product/:id", deleteProduct)

module.exports = router