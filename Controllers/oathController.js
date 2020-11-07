const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const db = require('../db')

module.exports = {
    oath: async (req ,res) => {
        const body = req.body
        const sql = `
            SELECT * FROM users
            WHERE username = $1
        `
        await db.query(sql, [body.username], async (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                const oath = await bcrypt.compare(body.password, result.rows[0].password)
                if (oath) {
                    const token = jwt.sign({ oath: result.rows[0].id }, "C9%1911#xG", {
                        expiresIn: "1h"
                    })
                    res.json({
                        token: token
                    })
                } else {
                    return res.send('err')
                }
            }
        })
    }
}