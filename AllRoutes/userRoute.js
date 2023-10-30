const express = require('express');
const { UserModel } = require('../Model/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const userRoute = express.Router()

userRoute.post('/signup', async(req, res)=>{

    const {email, password} = req.body;
    console.log(email);
    

    try {
        
        const ExistingUser = await UserModel.findOne({email})
        if(ExistingUser){
            res.status(200).send({"msg": "user already registered"})
        }
        else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                // Store hash in your password DB.

                if(err){
                    res.status(200).send({"msg": "cannot hash password", "err": err})
                }

                const user = new UserModel({email, password: hash})
                await user.save();
                res.status(200).send({"msg": "Registered Succesfully" })

            });
        }
        
    } catch (error) {
        
    }
})

userRoute.get("/login", async(req, res)=>{

    const {email, password} = req.body;
    console.log(email);
    

    try {
        
        const ExistingUser = await UserModel.findOne({email})
        if(ExistingUser){
            bcrypt.compare(password, ExistingUser.password, (err, result)=> {
                // result == true

                if(result){
                    const token = jwt.sign({userEmail: ExistingUser.email}, process.env.SECRET_KEY);
                    res.status(200).send({"msg": "Login In Successfully", "token": token})
                    
                }

                if(err){
                    res.status(200).send({"msg": "Wrong Crendentials"})
                }
            });
            
        }
        else{
           
        }
        
    } catch (error) {
        
    }
})





module.exports = {
    userRoute
}