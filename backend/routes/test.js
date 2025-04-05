const express = require("express");
const router = express.Router();
const testController = require('../controllers/testController');
const { Query } = require("mongoose");


//http://127.0.0.1:8000/v1/test
router.get('/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const test = await testController.getAll(id)
        res.status(200).json(test)
    }catch(error){
        res.status(500).json({ message: "Lỗi server", error });
    }
})

module.exports = router;