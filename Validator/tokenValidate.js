const jwt = require('jsonwebtoken')

module.exports = {
    checkToken: (req ,res, next) => {
        let token = req.get('authorization')
        if (token) {
            token = token.slice(7)
            console.log('yaaa',process.env.JWT_SECRET);
            jwt.verify(token, "C9%1911#xG", (err, decoded) => {
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