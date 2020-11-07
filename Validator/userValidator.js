const {check, validationResult } =  require('express-validator')

exports.userValidatorResult = (req, res, next) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
           })
    } 
    next()
}

exports.userValidator = [
    check('username', 'Username is not fill')
        .exists({checkNull: true})
        .not().isEmpty(),
    check('password', 'Password must be 6 or more')
        .isLength({min: 6})
]