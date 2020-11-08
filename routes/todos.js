const express = require('express')
const router = express.Router()
const { checkToken } = require('../Validator/tokenValidate')

const { todoValidatorResult, todoValidator } = require('../Validator/todoValidator')

const { createTodo, getTodoByOwner, getTodoALL, getTodoByCompleted, getTodoById, editTodo, deleteTodo, getTodoByCompletedALL} = require('../Controllers/todoController')

//Insert todo
router.post('/',checkToken, todoValidator, todoValidatorResult, createTodo)

//Show todo by owner
router.get('/', checkToken, getTodoByOwner)

//Show todo ALL
router.get('/all', getTodoALL)

//Show todo by completed
router.get('/completed/:completed', checkToken, getTodoByCompleted)

//Show todo by completed ALL
router.get('/completed-noauth/:completed', getTodoByCompletedALL)

//Show todo by id
router.get('/:id', checkToken, getTodoById)

//Edit todo
router.put('/:id', checkToken, todoValidator, todoValidatorResult, editTodo)

//Delete tood
router.delete('/:id', checkToken, deleteTodo)


module.exports = router