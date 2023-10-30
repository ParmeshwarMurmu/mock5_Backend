const express = require('express');
// const { UserModel } = require('../Model/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { DoctorModel } = require('../Model/doctorSchema');
require('dotenv').config()

const doctorRoute = express.Router()

doctorRoute.post('/appointments', async(req, res)=>{

    try {
        const doctor = new DoctorModel({...req.body})
        await doctor.save()
        res.status(200).send({"msg": "doctor added"})
    } catch (error) {
        
    }
})


module.exports = {
    doctorRoute
}