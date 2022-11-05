const jwt = require('jsonwebtoken')
const User = require('../../app/models/user')

const userAuthentication = (req, res, next) =>{
    const token = req.header('Authorisation').split(' ')[1]
    let tokenData
    try{
        tokenData = jwt.verify(token, 'secret456')
        User.findById(tokenData._id)
            .then((user)=>{
                req.user = user
                next()
            })
            .catch((err)=>{
                res.json(err.message)
            })
    }
    catch(err){
        res.json(err.message)
    }
}

module.exports = {
    userAuthentication
}