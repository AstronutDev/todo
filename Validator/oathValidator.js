const {check, validationResult } =  require('express-validator')

exports.oathValidatorResult = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
       return res.status(422).json({
            errors: errors.array()
        })
    }    
    next()
}

exports.oathValidator = [
    check('username', 'username is not fill')
        .exists({checkNull: true}),
    check('password', 'password is not fill')
        .exists({checkNull: true})
]