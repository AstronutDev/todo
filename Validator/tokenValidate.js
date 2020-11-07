const jwt = require('jsonwebtoken')

require('dotenv').config

module.exports = {
    checkToken: (req ,res, next) => {
        let token = req.get('authorization')
        if (token) {
            token = token.slice(7)
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if(err) {  
                    res.json({
                        message: 'Invalid token'
                    })
                } else {
                    req.headers = {...req.headers, userId: decoded.oath}
                    next()
                }
            })
        } else {
            res.json({
                message: 'Access denined! unauthorized user'
            })
        }
    } 
}