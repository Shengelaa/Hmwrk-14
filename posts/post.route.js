
const {Router} = require('express')
const { findAllPosts, findPostById, createPost, deletePostById, updatePostById } = require('./post.service')
const postRouter = Router()

postRouter.get('/', findAllPosts)

postRouter.get('/:id', findPostById)

postRouter.post('/', createPost)

postRouter.delete('/:id', deletePostById)

postRouter.put('/:id', updatePostById)

module.exports = postRouter
