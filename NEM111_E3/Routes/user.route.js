const express = require("express")
const bcrypt = require("bcrypt")
const { userModel } = require("../Model/user.model")
const jwt = require("jsonwebtoken")
const { blacklist } = require("../blacklist")
const { registerAccount } = require("../registerAccount")
const userRoutes = express.Router()

userRoutes.post("/register", (req, res) => {
    const { name, email, pass, city, age } = req.body
    if (/[A-Z]/.test(pass) && /\d/.test(pass) && /[!@#$%^&*]/.test(pass) && pass.length >= 8) {
        if (registerAccount.includes(email)) {
            res.status(400).json({ err: "already exist" })
        }
        else {
            try {
                bcrypt.hash(pass, 5, async (err, hash) => {
                    if (err) {
                        res.status(400).json({ err: err.message })
                    }
                    else {
                        const user = new userModel({ name, email, pass: hash, city, age })
                        await user.save();
                    }
                })
                registerAccount.push(email)
                res.status(200).json({ msg: "The new user has been registered", registeredUser: res.body })
            }
            catch (err) {
                res.status(400).json({ error: err.message })
            }
        }
    } else {
        res.status(400).json({ error: "At least one uppercase character, At least one number, At least a special character, The length of password should be at least 8 characters long" })
    }
})


userRoutes.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    let token = jwt.sign({course:"backend"},"shivansh",{expiresIn:"120"})
                    let refreshToken = jwt.sign({courese:"backend"},"soni",{expiresIn:300})
                    res.status(200).json({msg:"Login successful!", token:token, refreshToken:refreshToken})
                }
                else { 
                    res.status(200).json({err:"wrong credential"})
                }
            })
        }
        else { 
            res.status(200).json({err:"user not found"})
        }

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

userRoutes.get("/logout",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try{
        blacklist.push(token)
        res.status(200).json({msg:"User has been logged out"})

    }
    catch(err){
        res.status(400).json({err:err.message})
    }
})

module.exports={
    userRoutes
}
