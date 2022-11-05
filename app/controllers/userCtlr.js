const User = require('../models/user')
const Category = require('../models/category')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userCtlr = {}

userCtlr.list = (req, res) =>{
    User.find()
        .then((users)=>{
            res.json(users)
        })
        .catch((err)=>{
            res.json(err)
        })
}

userCtlr.show = (req, res) =>{
    const user = req.user
    res.json(user)
}

userCtlr.register = (req, res)=>{
    const body = req.body
    const user = new User(body)
    bcrypt.genSalt()
        .then((salt)=>{
            bcrypt.hash(user.password, salt)
                .then((encrypted)=>{
                    user.password = encrypted
                    user.save()
                        .then((usr)=>{
                            // res.json(usr)
                            const category = new Category({name :`uncategorised-${usr.name}`, userId : usr._id})
                            category.save()
                                .then((ctgry)=>{
                                    // console.log(ctgry)
                                    res.json(usr)
                                })
                                .catch((err)=>{
                                    res.json(err)
                                })
                        })
                        .catch((err)=>{
                            res.json(err)
                        })
                })
                .catch((err)=>{
                    res.json(err)
                })
        })
        .catch((err)=>{
            res.json(err)
        })
}

userCtlr.login = (req, res)=>{
    const body = req.body
    User.findOne({ email : body.email})
        .then((user)=>{
            if(!user){
                res.json('invalid email or password')
            }

            bcrypt.compare(body.password, user.password)
                .then((match)=>{
                    if(match){
                        const tokenData = {
                            _id : user._id,
                            email : user.email,
                            name : user.name
                        }
                        const token = jwt.sign(tokenData, 'secret456', {expiresIn:'1d'})
                        res.json({
                            token : `Bearer ${token}`
                        })
                    }else{
                        res.json('invalid email or password')
                    }
                })
                .catch((err)=>{
                    res.json(err)
                })
        })
}

userCtlr.destroy = (req, res) =>{
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = userCtlr