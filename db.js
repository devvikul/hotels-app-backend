const mongoose = require('mongoose')
require('dotenv').config()

const mongoURL = process.env.DB_URL

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to mongodb server')
})

db.on('error', ()=>{
    console.log('Error in mongodb connection')
})

db.on('disconnected', ()=>{
    console.log('Mongodb server disconnected')
})

module.exports = db