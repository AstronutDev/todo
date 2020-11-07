const express = require('express')
const router = express.Router()
const { oath } = require('../Controllers/oathController')

const { oathValidatorResult, oathValidator } = require('../Validator/oathValidator')

router.post('/',oathValidator , oathValidatorResult, oath)

module.exports= router