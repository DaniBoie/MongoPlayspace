const router = require('express').Router()
const { Item } = require('../models')

//GET all items
router.get('/items', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => console.log(err))
})

//POST one item 

router.post('/items', (req, res) => {
  
})

//PUT one item
router.put('/items:id', (req, res) => {

})

//DELETE one item
router.delete('/items:id', (req, res) => {

})