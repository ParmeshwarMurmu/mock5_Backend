const express = require('express')
require('dotenv').config()
const { connection } = require('./db')
const { userRoute} = require('./AllRoutes/userRoute')
const { doctorRoute } = require('./AllRoutes/doctorRoute')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())
app.use('/user', userRoute)
app.use('/doctor', doctorRoute)


app.listen(process.env.PORT, async()=>{

    try {
        console.log("Connection to database")
        await connection;
        console.log("connected");
        console.log(`Express server running at port ${process.env.PORT}`)
    } catch (error) {
        console.log("wrong");
        console.log(error);
    }
})