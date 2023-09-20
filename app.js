const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth/authRoutes")
const productsRoutes = require("./routes/products/productsRoutes")
const { firebase, storage, getImages } = require("./firebase")

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes)
app.use("/products", productsRoutes)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("conecto mongodb");
    })
    .catch(err => {
        console.log("err connect", err);
    })



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
