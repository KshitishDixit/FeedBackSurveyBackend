const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20')
const keys=require('../config/key')
const mongoose=require('mongoose')
const cookieSession=require('cookie-session')
const User=mongoose.model('users')


passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:"/auth/google/callback",
    proxy:true
},(accessToken,refreshToken,profile,done)=>{
    User.findOne({googleId:profile?.id})
    .then((existingUser)=>{
        if(existingUser){
            done(null,existingUser)
        }else{
            User.create({googleId:profile?.id}).then((user)=>{
                done(null,user)
            })
        }
    }).catch()
    
}))
