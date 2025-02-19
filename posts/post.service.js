const { isValidObjectId } = require("mongoose")
const postModel = require("../models/post.model")
const userModel = require("../models/user.model")


const findAllPosts = async (req, res) => {
    const posts = await postModel.find().populate('user', 'name email')
    res.json(posts)
}

const findPostById = async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)) return res.status(400).json({message: 'wrong id is provided'})

    const post = await postModel.findById(id)
    if(!post) return res.status(400).json({message: "post not found"})
    return post
}

const createPost = async (req, res) => {
    const {title, content} = req.body
    if(!title || !content) return res.status(400).json({message: "wrong parameteres"})
    
    const post = await postModel.create({title, content, user: req.userId})
    await userModel.findByIdAndUpdate(req.userId, {$push: {posts: post._id}})
    res.status(201).json(post)
}

const deletePostById = async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)) return res.status(400).json({message: 'wrong id is provided'})

    const deletedPost = await postModel.findByIdAndDelete(id)
    if(!deletedPost) return res.status(400).json({message: `Cannot delete post by id: ${id}`})
    
    await userModel.updateOne({_id: req.userId}, {$pull: {posts: deletedPost._id}})

    res.json({message: "post deleted successfully", data: deletedPost})
}

const updatePostById = async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId(id)) return res.status(400).json({message: 'wrong id is provided'})
    
    const updateRequest = {}
    const {content, title} = req.body
    if(content) updateRequest.content = content
    if(title) updateRequest.title = title
    
    const updatedPost = await postModel.findByIdAndUpdate(id, updateRequest, {new: true})
    res.json({message: 'post updated successfully', data: updatedPost})
}



module.exports = {findAllPosts, findPostById, createPost, deletePostById, updatePostById}