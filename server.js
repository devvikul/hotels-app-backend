const express = require('express')
const app = express()
const db = require('./db')
const personRoutes =  require("./routes/personRoutes")
const menuItemRoutes =  require("./routes/menuItemRoutes")
const bodyParser =  require('body-parser')
require('dotenv').config()
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Welcome to our hotels")
})

app.use('/person', personRoutes)
app.use('/menuitems', menuItemRoutes)


const PORT =  process.env.PORT || 700
app.listen( PORT, ()=>{
    console.log("server running on port 7000")
})