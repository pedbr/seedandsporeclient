import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const SuccessfulPurchase = () => {
  const [searchParams] = useSearchParams()

  const paymentStatus = searchParams.get('redirect_status')

  const getMessage = () => {
    switch (paymentStatus) {
      case 'succeeded':
        return 'Payment succeeded!'

      case 'processing':
        return 'Your payment is processing.'

      case 'requires_payment_method':
        return 'Your payment was not successful, please try again.'

      default:
        return 'Something went wrong.'
    }
  }

  return (
    <Box>
      <Typography variant={'h1'}>{getMessage()}</Typography>
    </Box>
  )
}

export default SuccessfulPurchase
