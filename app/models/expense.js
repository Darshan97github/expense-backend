const exp = require('constants')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Expense name is mandatory'],
        unique : true
    },
    amount : {
        type : Number,
        required : [true, 'amount is compulsory']
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    categoryId : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense