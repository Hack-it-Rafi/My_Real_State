import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { useLoaderData } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY)
const Payment = () => {
    const data = useLoaderData()
    console.log(data);
    return (
        <div>
            <h1>Payment page</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm data={data}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;