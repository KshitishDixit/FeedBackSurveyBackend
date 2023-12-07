import React, { useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'

export const CheckoutForm = () => {
  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
let options;
  const [errorMessage, setErrorMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [cardDetails, setCardDetails] = useState(null);

  const handlePaymentMethodChange = (event) => {
    console.log('event;;;',event)

    if (event.complete) {
      const { paymentMethod } = event;
      setCardDetails(paymentMethod);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }
    console.log('element',elements.paymentMethod)
   

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    const price = 12;

    try {
      const paymentResponse = await dispatch(actions.handleToken({
        currency: 'usd',
        email: emailInput,
        amount: price * 100,
        paymentMethodType: "card",
      }));
      console.log('payment',paymentResponse)
      const { client_secret: clientSecret } = paymentResponse;

      const { error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {

      }
    } catch (error) {
      console.error('Error in dispatching handleToken:', error);
      // Handle error appropriately
    }

  };

  console.log('cardDetails',options)
  return (
    <form onSubmit={handleSubmit} className='px-4'>
      <div className='mb-3'>
        <label htmlFor="email-input">Email</label>
        <div>
          <input value={emailInput} onChange={(e => setEmailInput(e.target.value))} type="email" id="email-input" placeholder='johndoe@gmail.com' />
        </div>
      </div>
      <PaymentElement options={options}/>
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};