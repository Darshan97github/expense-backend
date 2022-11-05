const Budget = require('../models/budget')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const budgetCtlr = {}

budgetCtlr.list = (req, res) =>{
    let id = req.user._id
    Budget.find({userId : id})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetCtlr.create = (req, res) =>{
    const body = req.body
    const budget = new Budget(body)
    budget.save()
        .then((bdgt)=>{
            res.json(bdgt)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetCtlr.update = (req, res) =>{
    const id = req.params.id
    const body = req.body
    Budget.findByIdAndUpdate(id, body, {new : true, runValidators : true})
        .then((bdgt)=>{
            res.json(bdgt)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetCtlr.destroy = (req, res)=>{
    const id = req.params.id
    Budget.findByIdAndDelete(id)
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = budgetCtlr