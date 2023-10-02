const express = require("express")
const router = express.Router()
const upload = require('../../middlewares/multer')
const authController = require("../../controllers/auth/authController")
//validations
const loginValidations = require("../../middlewares/validations/auth/loginValidations")
const registerValidations = require("../../middlewares/validations/auth/registerValidation")
const verifyToken = require("../../middlewares/verifyToken")

const { login, register, profile } = authController

router.post("/login", loginValidations, login)

router.post("/register",
    upload.single('image'),
    verifyToken,
    registerValidations,
    register
)

router.get("/profile", verifyToken, profile)

module.exports = router