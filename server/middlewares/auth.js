const models = require('../models')
const jwt = require('jsonwebtoken')



const isLogedIn = (req,res,next) =>{
    try {
        if(!req.headers.authorization){
            res.status(400).json({
                message: 'لم يتم توفير رمز التحقق'
            })
        }
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.currentUser = decoded
        return next()
    } catch (e) {
        res.status(500).json(e.message)
    }
}

module.exports = isLogedIn