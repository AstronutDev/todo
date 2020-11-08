const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const db = require('../db')

require('dotenv').config()


exports.oath = async (req ,res) => {
    const body = req.body
    const sql = `
        SELECT * FROM users
        WHERE username = $1
    `
    try {
        await db.query(sql, [body.username], async (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                if (result.rows.length == 0) {
                    res.json({
                        error: 'user not found'
                    })
                } else {
                    const isMatch = await bcrypt.compare(body.password, result.rows[0].password)
                    if (isMatch) {
                        const token = jwt.sign({ oath: result.rows[0].id }, process.env.JWT_SECRET, {
                            expiresIn: "1h"
                        })
                        res.json({
                            token: token
                        })
                    } else {
                        return res.json({
                            message:'Username or password wrong'
                        })
                    }
                }
            }
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
}