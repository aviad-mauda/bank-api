const fs = require('fs');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const schema = require(path.join(__dirname,'../schemas/userSchema.js'));

const userSchema = new mongoose.Schema(schema);

userSchema.statics.findByCredentials = async (email, password) => {
    console.log("user 1");
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    console.log(user);
    console.log("user 3");
    return user
}

userSchema.methods.generateAuthToken = async function () {

    let user = this
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
    user.token = token;
    console.log("user 5");
    await user.save()

    return token
}

// userSchema.pre('save', async function (next) {
//     const user = this
//     user.password = await bcrypt.hash(user.password, 8);
//     console.log("aaa");
//     next()
// })

const User = mongoose.model('users', userSchema)

module.exports = User