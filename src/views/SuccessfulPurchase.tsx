import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
    shippingType,
  } = useStore()
  const navigate = useNavigate()
  const { t } = useTranslation()

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
      shippingType,
      shippingCost: shippingType === 'premium' ? 4 : 0,
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
        return t('checkout.succeeded.header')

      case 'processing':
        return t('checkout.processing.header')

      case 'requires_payment_method':
        return t('checkout.requirePayment.header')

      default:
        return t('checkout.default.header')
    }
  }

  const getBody = () => {
    switch (paymentStatus) {
      case 'succeeded':
        return t('checkout.succeeded.body')

      case 'processing':
        return t('checkout.processing.body')

      case 'requires_payment_method':
        return t('checkout.requirePayment.body')

      default:
        return t('checkout.default.body')
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
                {t('checkout.contactUs')}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant={'contained'} onClick={() => navigate('/')}>
                {t('checkout.backHome')}
              </Button>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Box>
  )
}

export default SuccessfulPurchase
