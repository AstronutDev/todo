const bcrypt = require('bcrypt')
const db = require('../db')

module.exports = {
    showAllUser: async(req, res) => {
        const sql = 'SELECT * FROM users'
        await db.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result.rows)
            }
        })
    },

    createUser: async (req, res) => {
            const body = req.body
            const salt = await bcrypt.genSalt(10)
            body.password = await bcrypt.hash(body.password, salt)
            const sql = `
                INSERT INTO users (username, password, name) 
                VALUES ($1, $2, $3)
            `
            await db.query(sql, [body.username,body.password, body.name], (err, result) => {
                if (err) {
                    res.json({
                        error: 'create user fail'
                    })
                } else {
                    res.json({
                        message: 'create user complete'
                    })
                }
            })
        }

}