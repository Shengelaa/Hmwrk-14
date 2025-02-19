
const { Router } = require('express')
const isAuth = require('../middlewares/isAuth')
const { getAllUser, getUserById, deleteUserById, updateUserById } = require('./user.service')
const userRouter = Router()

userRouter.get('/', getAllUser)

userRouter.get('/:id', getUserById)

userRouter.delete('/:id', isAuth, deleteUserById)

userRouter.put('/:id', isAuth, updateUserById)

module.exports = userRouter
