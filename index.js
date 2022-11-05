const express = require('express')
const cors = require('cors')
const app = express()
const Port = 3060
app.use(cors())
app.use(express.json())

const configureDb = require('./config/database')
const router = require('./config/routes')

configureDb()
app.use(router)

app.listen(Port, ()=>{
    console.log('Server is running on port', Port)
})