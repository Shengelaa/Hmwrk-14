const { default: mongoose } = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected successfully')
    } catch (error) {
        console.log(error, "cound not connect mongoDb")
    }
}