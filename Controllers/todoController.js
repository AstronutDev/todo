const db = require('../db')

module.exports = {
    createTodo: async (req, res) => {
        const {todo, completed} = req.body
        try {
            const sql = `
                INSERT INTO todos (todo, completed, create_by) 
                VALUES($1, $2, $3)
            `
            console.log(!!completed);
            await db.query(sql, [todo, !!completed, req.headers.userId], (err, result) => {
                if(err) {
                    res.send(err)
                } else {
                    res.json({
                        message: 'add complete'
                    })
                }
            })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }  
    },

    getTodoByOwner: async (req, res) => {
        try {
            const sql = `
                SELECT * FROM todos
                WHERE create_by = $1
            `
        await db.query(sql, [req.headers.userId], (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json({response: result.rows})
            }
        })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    },

    getTodoALL: async (req, res) => {
        try {
            const sql = `
                SELECT * FROM todos
            `
            await db.query(sql, (err, result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(result.rows)
                }
            })
        } catch (error) {
           res.status(500).json({
               error: error
           }) 
        }
    },

    getTodoByCompleted: async (req ,res) => {
        const { completed } = req.params
        try {
            const sql = `
                SELECT * FROM todos
                WHERE completed = $1 AND create_by =$2
            `

            await db.query(sql, [completed, req.headers.userId], (err, result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.json({response: result.rows})
                }
            })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    },

    getTodoById:  async (req ,res) => {
        const { id } = req.params
        try {
            const sql = `
                SELECT * FROM todos
                WHERE id = $1 AND create_by = $2
             `
            await db.query(sql, [id, req.headers.userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    if (result.rowCount != 0 ){
                        res.send(result.rows[0])
                    } else {
                        res.status(400).json({error:'cant read'})
                    }
                }
        })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    },

    editTodo: async (req, res) => {
        const { id } = req.params
        const {todo, completed} = req.body

        try {
            const sql = `
                UPDATE todos
                SET todo = $1, completed = $2
                WHERE id = $3 AND create_by = $4
            `  
            await db.query(sql, [todo, completed, id, req.headers.userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    console.log('ya',result);
                    if (result.rowCount != 0) {
                        res.json({message: 'update success'})
                    } else {
                        res.status(400).json({error: 'update fail'})
                    }
                    
                }
            })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    },

    deleteTodo: async(req, res) => {
        const { id } = req.params
        try {
            const sql = `
                DELETE FROM todos
                WHERE id = $1 AND create_by = $2
            `
            await db.query(sql, [id, req.headers.userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    if (result.rowCount != 0) {
                        res.json({message: 'delete success'})
                    } else {
                        res.status(400).json({error:'delete fail'})
                    }
                }
            })
        } catch (error) {
            res.status(500).json({
                error: err
            })
        }
    }
}
