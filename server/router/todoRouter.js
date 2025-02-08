const express = require('express');
const router = express.Router()
const todoController = require('../controller/todoController');

router.post('/createtodo',todoController.createTodo);
router.get('/gettodo',todoController.getTodo);
router.put('/editodo/:id',todoController.editTodo);
router.delete('/delettodo/:id',todoController.deleteTodo);

module.exports = router