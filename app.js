const express = require('express')

require('./db/mongoose')
const app = require('./routers/router')

module.exports = app;