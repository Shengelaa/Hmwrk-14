const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    password: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model('post', postSchema)