const mongoose = require("mongoose");

const connection =mongoose.connect("mongodb+srv://shivansh:soni@cluster0.cfsytiy.mongodb.net/NEM111E3?retryWrites=true&w=majority")
module.exports={
    connection
}