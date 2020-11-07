const express = require('express')
const router = express.Router()
const { showAllUser, createUser } = require('../Controllers/usersController')

const { userValidatorResult, userValidator } = require('../Validator/userValidator')

router.get('/', showAllUser)

router.post('/',userValidator, userValidatorResult, createUser)

module.exports = router