import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Box, Button, Typography } from '@mui/material'
import useStore from '../store'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { cartItems } = useStore()

  const [message, setMessage] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3006/success',
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <Box px={4}>
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' />
        <Box display={'flex'} justifyContent={'center'} py={3}>
          <Button
            variant={'contained'}
            disabled={
              isLoading || !stripe || !elements || !Boolean(cartItems.length)
            }
            id='submit'
            type='submit'
          >
            <span id='button-text'>Pay now</span>
          </Button>
        </Box>

        {/* Show any error or success messages */}
        {message && <Typography id='payment-message'>{message}</Typography>}
      </form>
    </Box>
  )
}
