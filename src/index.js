const express=require('express')
const mongoose=require('mongoose')
const keys=require('./config/key')
const cookieSession = require('cookie-session')
const passport = require('passport')
const dotenv=require('dotenv').config()
require('./models/User')
require('./services/passport')



mongoose.connect(keys.mongoUri)
const app=express()


app.get('/',(req,res)=>{

    res.send({hi:'there'});
})
app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())
require('./routes/authRoutes')(app)

const PORT=process.env.PORT
console.log(PORT)
app.listen(PORT)