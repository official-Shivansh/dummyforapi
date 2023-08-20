const mongoose = require("mongoose")
const booksSchema = mongoose.Schema({
    title:String,
    genre:String,
    author:String,
    publishing_year:Number
})
const booksModel = mongoose.model("books",booksSchema)
module.exports= {
    booksModel
}