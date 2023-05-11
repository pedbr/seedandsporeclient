import { Box, Button, Checkbox, Grid, Stack, Typography } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { api } from '../api'
import CheckoutForm from '../components/CheckoutForm'
import UserInfoElement from '../components/UserInfoElement'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useStore from '../store'
import { appearance } from '../styles/stripeAppearance'
import { formatNumberToTwoDecimalString } from '../utils'

// const stripePromise = loadStripe(
//   'pk_test_51LttTdCkXFiy2LWeKmzZY48CKBd3AmoFMaB8QvVi2ErysC4LbQ48idsaAFfldri889fYIoPgPS5K8z51iql2jfIE00MIKJbl8q'
// )
const stripePromise = loadStripe(
  'pk_live_51MEgUFBxpOqWPrlK4JwOmgSjoVKWRZDIgggqYxdAy0VgQ9y8DdDaAgoqvGPaFU1ehYqKHH90OWhOQ9QynakMIwjK00d6spIf7H'
)

const Checkout = () => {
  const { cartTotalPrice, cartItems, currentOrder, setShippingType } =
    useStore()
  const [clientSecret, setClientSecret] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [shippingCost, setShippingCost] = useState(0)

  const totalOrderCost = cartTotalPrice + shippingCost

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!currentOrder) {
        return null
      }
      try {
        const { data } = await api.post('/payment', {
          totalPrice: totalOrderCost,
          orderId: currentOrder.id,
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
  }, [cartItems, currentOrder, totalOrderCost])

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Stack pt={'100px'} px={{ xs: 2, lg: 24 }} minHeight={'90vh'} spacing={2}>
      <Box>
        <Button
          variant={'outlined'}
          size={'small'}
          onClick={() => navigate('/store')}
        >
          <ArrowBackIcon sx={{ marginRight: 1 }} />
          {t('checkout.backToStore')}
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant={'h2'}>{t('checkout.checkout')}</Typography>
      </Box>

      <UserInfoElement />
      <Box p={2}>
        <Typography>{t('checkout.paymentDetails')}</Typography>
        <Stack bgcolor={'ghostwhite'} p={2}>
          <Typography variant={'caption'} mb={1}>
            {t('checkout.products')}
          </Typography>
          <Grid container spacing={2} mb={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Stack
                  alignItems={'center'}
                  direction={'row'}
                  justifyContent={'space-between'}
                  p={2}
                  spacing={2}
                  bgcolor={'white'}
                  height={'100%'}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Box
                        height={'80px'}
                        width={'80px'}
                        minWidth={'80px'}
                        minHeight={'80px'}
                        sx={{
                          backgroundImage: `url(${
                            item.imageUrl || PRODUCT_DEFAULT_IMAGE
                          })`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Stack>
                        <Typography variant={'body1'}>{item.name}</Typography>
                        <Typography
                          maxWidth={'150px'}
                          variant={'caption'}
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Typography variant={'body2'}>
                          {t('checkout.costUni')}{' '}
                          {formatNumberToTwoDecimalString(item.price)} €
                        </Typography>
                        <Typography variant={'body2'}>
                          {t('checkout.quantity')} {item.quantity}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Typography variant={'caption'} mt={2}>
            {t('checkout.shipping')}
          </Typography>
          <Box display='flex' alignItems='center' mb={2} mt={1}>
            <Checkbox
              checked={shippingCost === 0}
              onClick={() => {
                setShippingCost(0)
                setShippingType('standard')
              }}
            />
            <Box>
              <Typography>{t('checkout.standardShipping')}</Typography>
              <Typography variant='caption'>
                {t('checkout.standardShippingDescription')}
              </Typography>
            </Box>
          </Box>
          <Box display='flex' alignItems='center' mb={2}>
            <Checkbox
              checked={shippingCost === 4}
              onClick={() => {
                setShippingCost(4)
                setShippingType('premium')
              }}
            />
            <Box>
              <Typography>{t('checkout.premiumShipping')}</Typography>
              <Typography variant='caption'>
                {t('checkout.premiumShippingDescription')}
              </Typography>
            </Box>
          </Box>
          <Typography mb={3}>
            {t('checkout.shippingCost')}{' '}
            {formatNumberToTwoDecimalString(shippingCost)}€
          </Typography>
          <Box p={2} display={'flex'} justifyContent={'center'}>
            <Typography variant={'h3'}>
              {t('checkout.total')}{' '}
              {formatNumberToTwoDecimalString(totalOrderCost)}€
            </Typography>
          </Box>
        </Stack>
      </Box>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <Box p={4}>
        <Typography variant={'caption'}>{t('checkout.accepting')}</Typography>
      </Box>
    </Stack>
  )
}

export default Checkout
