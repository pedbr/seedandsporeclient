import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { api } from '../api'
import { IMAGES } from '../constants'
import useStore from '../store'
import { OrderType } from '../types/orders'

const SuccessfulPurchase = () => {
  const [searchParams] = useSearchParams()
  const {
    currentOrder,
    resetCart,
    orderFullName,
    orderEmail,
    orderPhoneNumber,
    orderDeliveryAddress,
    orderDeliveryPostCode,
    orderDeliveryLocation,
    orderBillingAddress,
  } = useStore()
  const navigate = useNavigate()

  const paymentStatus = searchParams.get('redirect_status')

  const mutation = useMutation(() => {
    return api.patch(`/orders/userInfo/${currentOrder?.id || ''}`, {
      orderFullName,
      orderEmail,
      orderPhoneNumber,
      orderDeliveryAddress,
      orderDeliveryPostCode,
      orderDeliveryLocation,
      orderBillingAddress,
    })
  })

  const confirmationMutation = useMutation((order: OrderType) => {
    return api.post(`/orders/confirm/${order.id}`, { orderEmail })
  })

  useEffect(() => {
    const updateOrder = async () => {
      if (!currentOrder || paymentStatus !== 'succeeded') return null
      try {
        await mutation.mutateAsync()
        await confirmationMutation.mutateAsync(currentOrder)
        resetCart()
      } catch (error) {
        console.error(error)
      }
    }
    updateOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder, paymentStatus])

  if (!currentOrder) {
    return (
      <Box>
        <Typography>There was an error creating your order.</Typography>
      </Box>
    )
  }

  const getHeader = () => {
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

  const getBody = () => {
    switch (paymentStatus) {
      case 'succeeded':
        return 'Thank you so much for your purchase, it has now been confirmed! You will receive a confirmation email in your inbox! Remember to check your junk or spam folder! We are now preparing your order and will keep you updated along the way. If you have any questions please reach out through our contact form or send us an email at seedandspore@proton.me'

      case 'processing':
        return 'We are now processing your payment please do not leave this page!'

      case 'requires_payment_method':
        return 'There was a problem with your payment, please go back and try again or change your payment method - no money was collected from you yet!'

      default:
        return 'Oops! It seems that a problem ocurred! Please try again - no money was collected from you yet!'
    }
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      px={2}
      sx={{
        backgroundImage: `url(${IMAGES.ctaSection})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Stack
        spacing={5}
        textAlign={'center'}
        bgcolor={'white'}
        p={4}
        borderRadius={'12px'}
      >
        <Typography variant={'h2'} color={'branding.sunlight'}>
          {getHeader()}
        </Typography>
        <Typography maxWidth={800} variant={'body1'}>
          {getBody()}
        </Typography>
        {paymentStatus !== 'processing' && (
          <Grid
            display={'flex'}
            spacing={2}
            container
            justifyContent={'center'}
          >
            <Grid item xs={12} md={6}>
              <Button
                variant={'outlined'}
                onClick={() => navigate('/contact', { replace: true })}
              >
                Contact Us!
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant={'contained'} onClick={() => navigate('/')}>
                Go back to homepage
              </Button>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Box>
  )
}

export default SuccessfulPurchase
