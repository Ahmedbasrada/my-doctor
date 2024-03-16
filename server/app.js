const express = require('express')
require('dotenv').config()
const routes = require('./routrs')
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
// يجب اولا ان تستورد 
// db
// ثم 
// index
const db = require('./models/database') // db للأتصال بقاعده البيانات
const models = require('./models') // لربط الجداول
const port = process.env.PORT || 5000




app.use(bodyParser.urlencoded({ extended: false }))  // لقرائه ال جسم
app.use(bodyParser.json())
app.use(cors()) // لتشغيله على الويب
app.use(morgan('dev')) // It simplifies the process of logging requests to your application
app.use('/', routes)

app.use((req,res,next) =>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((error, req, res) =>{
    res.error.status(error.status || 500)
    res.json({
        message: error.message
    })
})

db.sync().then(()=>{
app.listen(port, () =>{
    console.log(`express runing on port ${port}`)
})
})