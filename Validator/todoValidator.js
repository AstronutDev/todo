const {check, validationResult } =  require('express-validator')

exports.todoValidatorResult = (req, res, next) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
           })
    } 
    next()
}

exports.todoValidator = [
    check('todo', 'todo is not fill')
        .exists({checkNull: true})
        .not().isEmpty()
]