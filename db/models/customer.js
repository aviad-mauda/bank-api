const fs = require('fs');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const schema = require(path.join(__dirname,'../schemas/customerSchema.js'));

const customerSchema = new mongoose.Schema(schema);

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer