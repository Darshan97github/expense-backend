const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name : {
        type : String,
        required : [true, 'Username is mandatory']
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User' 
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category