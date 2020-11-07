const express = require('express')
const router = express.Router()

const users = require('./users')
const todos = require('./todos')
const oath = require('./oath')

router.use('/users', users)
router.use('/todos', todos)
router.use('/oath', oath)

module.exports = router