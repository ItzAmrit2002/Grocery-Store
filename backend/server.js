const express = require("express")
const app = express()
const { json } = require('body-parser')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({extended: "false"}))
var cors = require('cors');
app.use(cors());

mongoose.connect( process.env.MONGO, () => {

    console.log('connected to MongoDB server')
    })
const port = process.env.PORT || 3500
const authRoute = require('./routes/auth')
app.use('/api/user', authRoute)
const itemsRoute = require('./routes/items')
app.use('/api/items', itemsRoute)
app.listen(port, ()=> {
    console.log("server running on port: ", port)
})

