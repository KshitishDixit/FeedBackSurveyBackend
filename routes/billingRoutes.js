const key  =require('../config/key')
const Stripe =require("stripe");
const routeMiddleware=require('../middlewares/routeMiddleware')
module.exports=(app)=>{

app.post('/api/stripe',routeMiddleware,async(req,res)=>{
    const { email, amount, currency, paymentMethodType } = req.body;    
  
    if (key.stripeSecretKey) {
        const stripe = new Stripe(key.stripeSecretKey, {
          apiVersion: "2023-08-16",
        });
    
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description: 'Software development services',
            shipping: {
                name: 'Jenny Rosen',
                address: {
                  line1: '510 Townsend St',
                  postal_code: '98140',
                  city: 'San Francisco',
                  state: 'CA',
                  country: 'US',
                },
              },

          });
          console.log('paymentINtent',req.user)
          req.user.credits+=5
          const user=await req.user.save()
          return res.status(200).json({
            client_secret: paymentIntent.client_secret,
            user:user
          });
        } catch (e) {
          console.log(e);
          return res.status(500).json({
            message: e.message,
          });
        }
      }
      return res.json({
        message: "Please add stripe api key",
      });
})
}

