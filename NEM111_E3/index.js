const jwt = require("jsonwebtoken")
const express = require("express")
const { connection } = require("./db")
const { userRoutes } = require("./Routes/user.route")
const {booksRoutes} = require("./Routes/books.route")
const {ratelimiter} = require("./Middleware/ratelimiter")
const { sign } = require("crypto")
const app = express()

app.use(express.json())
app.use(ratelimiter)
app.use("/users",userRoutes)
app.use("/books",booksRoutes)
app.get("/",(req,res)=>{
    res.send("hello Shivnash")
})
app.get("/refreshtoken",(res,req)=>{
    const refreshtoken = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(refreshtoken,"soni")
    if(decoded){
        const token = jwt.sign({course:"backend"},"shivansh",{expiresIn:"120"})
        res.status(200).json({newToken:token})
    }
    else{
        res.status(400).json({error:"Error coming"})

    }
})


app.listen(8080, async()=>{
    try{
       await connection
       console.log("connected to data base");
       console.log("server is running")
    }
    catch(err){
        console.log(err)
    }
})
