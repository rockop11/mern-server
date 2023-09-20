const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: String,
    fullName: String,
    email: String,
    image: String,
    password: String,
    tel: String,
    isAdmin: Boolean,
})

const User = model('User', userSchema)

module.exports = User;

