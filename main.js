const express = require('express')
const userRouter = require('./users/user.route')
const connectToDb = require('./db/connectToDb')
const expensesRouter = require('./expenses/expense.route')
const authRouter = require('./auth/auth.route')
const isAuth = require('./middlewares/isAuth')
const app = express()
const cors = require('cors')

connectToDb()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/expenses', isAuth, expensesRouter)


app.listen(3001, () => {
    console.log('server running on http://localhost:3001')
})
