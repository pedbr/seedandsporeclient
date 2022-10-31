import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import useStore from '../store'
import { api } from '../api'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

interface CartProps {
  onClose: () => void
}

const Cart = ({ onClose }: CartProps) => {
  const {
    cartItems,
    resetCart,
    removeFromCart,
    cartTotalPrice,
    setCurrentOrder,
  } = useStore()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleCheckout = async () => {
    try {
      const { data } = await api.post('/orders', {
        products: cartItems,
        totalPrice: cartTotalPrice,
      })
      if (data?.data) {
        setCurrentOrder(data.data)
        navigate('/checkout')
        onClose()
      } else {
        throw new Error()
      }
    } catch (error) {
      enqueueSnackbar('There was an error creating your order', {
        variant: 'error',
      })
      console.log(error)
    }
  }

  return (
    <Box height={'100vh'} p={2} width={400}>
      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>Shopping cart</Typography>
      </Stack>
      <Stack height={'95%'} justifyContent={'space-between'}>
        <Stack my={2} spacing={2}>
          {cartItems.map((item) => (
            <Stack
              alignItems={'center'}
              direction={'row'}
              justifyContent={'space-between'}
              key={item.id}
              p={2}
              spacing={2}
              sx={{
                border: '1px solid black',
                borderRadius: 4,
              }}
            >
              <Stack direction={'row'} spacing={2}>
                <img
                  alt={'product'}
                  style={{
                    height: 64,
                    width: 64,
                    borderRadius: 8,
                    objectFit: 'cover',
                  }}
                  src={item.imageUrl || PRODUCT_DEFAULT_IMAGE}
                />
                <Stack>
                  <Typography variant={'body1'}>{item.name}</Typography>
                  <Typography variant={'body2'}>{item.description}</Typography>
                  <Typography variant={'caption'}>
                    Quantity: {item.quantity}
                  </Typography>
                </Stack>
              </Stack>
              <Stack>
                <IconButton onClick={() => removeFromCart(item)}>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack>
          <Stack direction={'row'} justifyContent={'space-between'} my={2}>
            <Typography variant='caption'>Total:</Typography>
            <Typography variant='caption'>{cartTotalPrice} EUR</Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Button onClick={resetCart} variant={'outlined'}>
              Empty Cart
            </Button>
            <Button onClick={handleCheckout} variant={'contained'}>
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Cart
