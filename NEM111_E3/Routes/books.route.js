const express = require("express")
const {auth} = require("../Middleware/auth")
const {booksModel} = require("../Model/book.model")

const booksRoutes = express.Router();

booksRoutes.get("/",auth,async(req,res)=>{
    try{
        const data = await booksModel.find()
        res.status(200).json({msg:"All the books present in the database"})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

booksRoutes.post("/add",auth,async(req,res)=>{
    try{
        const book = new booksModel(req.body)
        await book.save();
        res.status(200).json({msg:"Book added", addedBook:res.body })
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
})

booksRoutes.patch("/update/:id",auth,async(req,res)=>{
   const id = req.params.id

   try{
    await booksModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).json({msg:"Book has been updated"})
   }
   catch(err){
    res.status(400).json({error:err.message})
   }
})

booksRoutes.delete("/delete/:id",auth,async(req,res)=>{
    const id = req.params.id
    try{
        await booksModel.findByIdAndDelete({_id:id},req.body)
        res.status(200).json({msg:"Book has been deleted"})
       }
       catch(err){
        res.status(400).json({error:err.message})
       }
})

module.exports={
    booksRoutes
}


