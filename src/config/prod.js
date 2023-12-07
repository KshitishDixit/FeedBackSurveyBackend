const dotenv=require('dotenv').config()
module.exports={
    googleClientID:process.env.PROD_CLIENT_ID,
    googleClientSecret:process.env.PROD_CLIENT_SECRET,
    mongoUri:process.env.PROD_MONGOURI,
    cookieKey:process.env.PROD_COOKIE_KEY,
    stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey:process.env.STRIPE_SECRET_KEY,
}