import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../useAxiosSecure';
import { AuthContext } from '../../Authentication/AuthProvider';

const CheckOutForm = ({ data }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const { _id, amount,title,propId,image,agent,status,location,buyerMail,buyerName,date } = data
    console.log(amount)

    //todo : set the price lower in every database,in each property...cause stripe does not support payment exceed $999,999.99
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: 1234 })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure,amount])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newData = {
            title,
            propId,
            image,
            agent,
            status : 'bought',
            location,
            buyerName,
            buyerMail,
            date,
            amount
        }

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log("error from payment", error);
            setError(error.message)
        } else {
            console.log("payment methos", paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction Id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                try {
                    // Make a PUT request to the server to update the data
                    await axiosSecure.put(`/offeredProp/${_id}`, newData);
                    console.log('Data updated successfully');
                } catch (error) {
                    console.error('Error updating data:', error);
                }
            }
        }
    }

    return (
        <form className='w-96 my-10 mx-auto' onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',

                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                                border: '1px solid #ced4da'
                            },
                            border: '1px solid #ced4da', // Add border to each field
                            borderRadius: '4px', //
                        },
                        invalid: {
                            color: '#9e2146',
                        },

                    },
                }}
            />
            <button className='btn btn-primary m-4 px-6 ' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-600'>{error}</p>
            {transactionId && <p className='text-green-500'>your transaction is completed and trnxId is : {transactionId}</p>}
        </form>
    );
};


export default CheckOutForm;