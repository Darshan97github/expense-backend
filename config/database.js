const mongoose = require('mongoose')

const configureDb = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/expense-app',{
        useNewUrlParser : true,
        useUnifiedtopology : true
    })
        .then(()=>{
            console.log('Connected to Db')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = configureDb