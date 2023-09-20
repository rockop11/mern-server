const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    title: String,
    description: String,
    category: String,
    brands: [{ brand: String }],
    images: [{ name: String }],
    price: Number,
    discount: Number,
    stock: Number,
})

const Product = model('Product', productSchema)

module.exports = Product;

