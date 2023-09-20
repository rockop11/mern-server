const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const { uploadUserImage, getUserImage } = require('../../firebase')


const authController = {
    register: async (req, res) => {
        try {
            const { errors } = validationResult(req)

            if (errors.length) {
                res.status(400).json({
                    message: "completar campos incompletos",
                    errors: errors
                })
                return
            }

            const isRegistered = await User.findOne(
                { email: req.body.email }
            )

            if (isRegistered) {
                res.status(400).json({
                    message: "el email ya se encuentra registrado"
                })
                return
            } else {
                const { originalname, buffer } = req.file

                let newUser = User({
                    username: req.body.username,
                    fullName: req.body.fullName,
                    email: req.body.email,
                    image: req.file.originalname,
                    tel: req.body.tel,
                    password: bcrypt.hashSync(req.body.password, 10),
                    isAdmin: req.body.isAdmin
                })

                await newUser.save()
                    .then((data) => {
                        res.status(201).json({
                            message: "usuario creado",
                            data: data
                        });
                    })
                    .catch(err => {
                        res.json({
                            message: 'error al crear usuario',
                            error: err
                        });
                    })

                await uploadUserImage(newUser._id, originalname, buffer)
            }
        } catch (err) {
            res.status(400).json({
                error: err
            })
        }
    },

    login: async (req, res) => {
        const { errors } = validationResult(req)
        const { email, password } = req.body

        if (errors.length) {
            res.status(400).json({
                message: "validar campos erroneos o incompletos",
                errors: errors
            })
            return
        }

        const userToLogin = await User.findOne(
            { email: email },
        )

        const validatePassword = bcrypt.compareSync(password, userToLogin.password);

        if (validatePassword && userToLogin) {

            const { email, username, fullName, _id, tel, isAdmin, image } = userToLogin

            const urlImage = await getUserImage(_id, image)

            jwt.sign({ user: { email, username, fullName, _id, tel, isAdmin } }, process.env.JWT_SECRET_KEY, (err, token) => {
                res.json({
                    message: `Bienvenido ${userToLogin.fullName}`,
                    token,
                    urlImage
                })
            });
        } else {
            res.status(403).json({
                message: "Las credenciales no coinciden",
                errors: [{
                    msg: 'La credenciales no coinciden'
                }]
            })
        }
    },

    profile: (req, res) => {
        console.log("profile controller");
    }
}

module.exports = authController;