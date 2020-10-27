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
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {

    let user = this
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
    user.token = token;
    await user.save()

    return token
}

const User = mongoose.model('users', userSchema)

module.exports = User