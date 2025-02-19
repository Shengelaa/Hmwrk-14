const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const getToken = (headers) => {
    if(!headers['authorization']) return null

    const [type, token] = headers.authorization.split(' ')
    return type === 'Bearer' ? token : null
}

module.exports = async (req, res, next) => {
    const token = getToken(req.headers)
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.id
        next()
    }catch(e){
        res.status(401).json({message: "unauthorized"})
    }
}
