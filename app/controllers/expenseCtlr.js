const Expense = require('../models/expense')

const expenseCtlr = {}

expenseCtlr.list = (req, res) =>{
    let id = req.user._id
    Expense.find({userId: id })
        .then((expenses)=>{
            res.json(expenses)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseCtlr.create = (req, res) =>{
    const body = req.body
    const expense = new Expense(body)
    expense.save()
        .then((exp)=>{
            res.json(exp)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseCtlr.update = (req, res) =>{
    const id = req.params.id
    const body = req.body
    Expense.findByIdAndUpdate(id, body, {new:true, runValidators:true})
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

expenseCtlr.destroy = (req, res) =>{
    const id = req.params.id
    Expense.findByIdAndDelete(id)
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err.message)
        })
}

module.exports = expenseCtlr