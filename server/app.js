require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const port = process.env.PORT || 3000
const jwt = require ('jsonwebtoken')
const routes= require('./routes')
const schedule = require('./helpers/cronjob')


let url = process.env.MONGO_DB_URL
mongoose.connect(`${url}`, {useNewUrlParser : true, useCreateIndex : true})
.then(() =>{
    console.log(`======> Mongo DB Connected <=====`);
})
.catch(err => {
    console.log(err);
})

schedule()

app
    .use(express.json())
    .use(express.urlencoded({extended : true}))
    .use(cors())

app.use('/', routes)
app.listen(port, () => {
    console.log('listening on', port)
})