const { Router } = require("express");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = Router()
const dotenv = require('dotenv');
const isAuth = require("../middlewares/isAuth");
dotenv.config()


authRouter.post('/sign-up', async (req, res) => {
    const {email, password, name} = req.body
    if(!email || !password || !name) return res.status(400).json({message: "email, password and name is required"})

    const existUser = await userModel.findOne({email})
    if(existUser) return res.status(400).json({message: "user already exists"})
    
    const hashedPass = await bcrypt.hash(password, 10)
    await userModel.create({email, name, password: hashedPass})
    
    res.status(201).json({message: "user created successfully"})
})


authRouter.post('/sign-in', async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({message: "email and password is required"})
    const existUser = await userModel.findOne({email})
    if(!existUser) return res.status(400).json({message: "email or password is invalid"})

    const hassPassedEqual = await bcrypt.compare(password, existUser.password)
    if(!hassPassedEqual) return res.status(400).json({message: "email or password is invalid"})
    
    const payload = {
        id: existUser._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json(token)
})

authRouter.get('/current', isAuth, async (req, res) => {
    const user = await userModel.findById(req.userId)
    res.json(user)
})


module.exports = authRouter