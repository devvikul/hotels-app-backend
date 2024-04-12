const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/Menu')

router.post('/', async (req, res)=> {    
    try{
        const menuItem = req.body;
        const newMenuItem = new MenuItem(menuItem)
        const response = await newMenuItem.save()
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
})

router.get('/', async (req, res) =>{
    try{
        const response = await MenuItem.find()
        console.log("data fetched")
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/:taste', async (req, res) => {
    try{
        const taste = req.params.taste
        if(taste == "sweet" || taste == "sour" || taste == "sweet"){
            const response = await MenuItem.find({taste: taste})
            console.log("date fetched successfully")
            res.status(200).json(response)
        }else{
            res.status(404).json({message: "Taste not found"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})
module.exports =  router;