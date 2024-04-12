const express =  require('express')
const router = express.Router()
const Person = require("./../models/person")

router.post('/', async (req, res) => {
    try{
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log('data saved')
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/', async (req, res) =>{
    try{
        const persons = await Person.find()
        console.log("data fetched")
        res.status(200).json(persons)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/:workType', async (req, res)=>{
    try{
        const workType =  req.params.workType
        if(workType == "chef" || workType == "manager" || workType == "waiter"){
            const response = await Person.find({work: workType})
            console.log("data fetched successfully")
            res.status(200).json(response)
        }else{
            res.status(404).json({message: "Invalid Work Type"})
        }   
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.put("/:id", async (req, res) => {
    try{
        const personId =  req.params.id
        const updatedPersonData = req.body
        const response =  await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new : true,
            runValidators:true,
        })
        if(!response){
            res.status(404).json({message: "Person not found"})
        }
        console.log("data updated")
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.delete("/:id", async (req, res) =>{
    try{
        const personId =  req.params.id
        const response =  await Person.findByIdAndDelete(personId)
        if(!response){
            res.status(404).json({message: "Person not found"})
        }
        console.log("Person Deleted")
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = router

