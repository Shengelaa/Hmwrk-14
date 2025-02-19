const { isValidObjectId } = require("mongoose")
const userModel = require("../models/user.model")
const expensesModel = require("../models/expenses.model")



const getAllUser = async (req, res) => {
    const users = await userModel.find().select('-password').populate('expenses', '-user')
    res.json(users)
}

const getUserById = async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)) return res.status(400).json({message: 'wrong user id is provided'})
    const user = await userModel.findById(id).select('-password').populate('expenses', '-user')
    if(!user) return res.status(400).json({message: "user not found"})
        
    res.json(user)
}


const deleteUserById = async (req, res) => {
    const {id} = req.params

    if(!isValidObjectId(id)) return res.status(400).json({message: 'wrong user id is provided'})
    if(id !== req.userId) return res.status(401).json({message: 'unauthorized'})    
    
    const deletedUser = await userModel.findByIdAndDelete(req.userId)
    await expensesModel.deleteMany({user: req.userId})

    res.json({message: 'user deleted successfully', data: deletedUser})
}

const updateUserById = async (req, res) => {
    const {id} = req.params

    if(!isValidObjectId(id)) return res.status(400).json({message: 'wrong user id is provided'})
    if(id !== req.userId) return res.status(401).json({message: 'unauthorized'})
        
    const {email, name} = req.body
    const updateRequest = {}
    if(email) updateRequest.email = email
    if(name) updateRequest.name = name

    const updatedUser = await userModel.findByIdAndUpdate(req.userId, updateRequest, {new: true})

    res.json({message: "user updated successfully", data: updatedUser})
}

module.exports = { getAllUser, getUserById, deleteUserById, updateUserById }