const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../db/models/user')
const bcrypt = require('bcryptjs')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    email: 'test1@test1.com',
    password: "$2y$08$XmH94ObaZqvFgVvzYleM8uYNWvlc1z5uP2xwEtKx6ejH3fvsZ7XFi"
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}