import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { api } from '../api'
import CheckoutForm from '../components/CheckoutForm'
import UserInfoElement from '../components/UserInfoElement'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useStore from '../store'
import { appearance } from '../styles/stripeAppearance'
import { getShippingCost } from '../utils'

const stripePromise = loadStripe(
  'pk_test_51LttTdCkXFiy2LWeKmzZY48CKBd3AmoFMaB8QvVi2ErysC4LbQ48idsaAFfldri889fYIoPgPS5K8z51iql2jfIE00MIKJbl8q'
)

const Checkout = () => {
  const { cartTotalPrice, cartTotalWeight, cartItems, currentOrder } =
    useStore()
  const [clientSecret, setClientSecret] = useState('')
  const navigate = useNavigate()

  const shippingCost = getShippingCost(cartTotalWeight, cartTotalPrice)

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
          Back to store
        </Button>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant={'h2'}>Checkout</Typography>
      </Box>

      <UserInfoElement />
      <Box p={2}>
        <Typography>Payment Details</Typography>
        <Stack bgcolor={'ghostwhite'} p={2}>
          <Typography variant={'caption'} mb={1}>
            Products
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
                          Cost/Uni: {item.price} €
                        </Typography>
                        <Typography variant={'body2'}>
                          Quantity: {item.quantity}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Typography variant={'caption'} mt={2}>
            Shipping
          </Typography>
          <Typography mb={3}>Total shipping cost: {shippingCost}€</Typography>
          <Box p={2} display={'flex'} justifyContent={'center'}>
            <Typography variant={'h3'}>
              Total to pay: {totalOrderCost}€
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
        <Typography variant={'caption'}>
          By clicking 'Pay Now' you're accepting the terms and conditions, Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Typography>
      </Box>
    </Stack>
  )
}

export default Checkout
