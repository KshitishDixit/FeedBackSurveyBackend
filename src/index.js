const express=require('express')
const mongoose=require('mongoose')
const keys=require('./config/key')
const cookieSession = require('cookie-session')
const passport = require('passport')
const dotenv=require('dotenv').config()
const cors=require('cors')
require('./models/User')
require('./services/passport')



mongoose.connect(keys.mongoUri)
const app=express()

app.use(express.json());
app.use(cors());

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
require('./routes/billingRoutes')(app)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('../client/build'))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolved(__dirname,'client','build','index.html'))
    })
}

const PORT=process.env.PORT
console.log(PORT)
app.listen(PORT)