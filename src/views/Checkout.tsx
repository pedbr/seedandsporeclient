import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Stack, Typography } from '@mui/material'

import { api } from '../api'
import useStore from '../store'
import CheckoutForm from '../components/CheckoutForm'

const stripePromise = loadStripe(
  'pk_test_51LttTdCkXFiy2LWeKmzZY48CKBd3AmoFMaB8QvVi2ErysC4LbQ48idsaAFfldri889fYIoPgPS5K8z51iql2jfIE00MIKJbl8q'
)

const Checkout = () => {
  const { cartTotalPrice } = useStore()
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const { data } = await api.post('/payment', {
          items: [{ id: 'xl-tshirt', quantity: 2, prince: 120 }],
        })
        if (data) {
          setClientSecret(data.clientSecret)
        } else {
          throw new Error()
        }
      } catch (error) {
        console.log(error)
      }
    }
    createPaymentIntent()
  }, [])

  const appearance: { theme: 'stripe' } = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Stack p={2} spacing={2}>
      <Typography variant={'h2'}>Checkout</Typography>
      <Typography>Total to pay: {cartTotalPrice} EUR</Typography>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Stack>
  )
}

export default Checkout
