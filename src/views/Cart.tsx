import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import useStore from '../store'
import { api } from '../api'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import EmptyState from '../components/EmptyState'

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

  const isCartEmpty = !Boolean(cartItems.length)

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
    <Box height={'100vh'} p={2} width={400} bgcolor={'ghostwhite'}>
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
        <Stack my={2} spacing={2} height={'100%'}>
          {!isCartEmpty ? (
            cartItems.map((item) => (
              <Stack
                alignItems={'center'}
                direction={'row'}
                justifyContent={'space-between'}
                key={item.id}
                p={2}
                spacing={2}
                bgcolor={'white'}
              >
                <Stack direction={'row'} spacing={2}>
                  <Box
                    height={'64px'}
                    width={'64px'}
                    minWidth={'64px'}
                    minHeight={'64px'}
                    sx={{
                      backgroundImage: `url(${
                        item.imageUrl || PRODUCT_DEFAULT_IMAGE
                      })`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  />
                  <Stack>
                    <Typography variant={'body1'}>{item.name}</Typography>
                    <Typography variant={'caption'}>
                      {item.description}
                    </Typography>
                    <Typography variant={'body2'}>
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
            ))
          ) : (
            <Box
              height={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <EmptyState
                header='Your cart is empty'
                body='Go through our store items and add them to your cart!'
              />
            </Box>
          )}
        </Stack>
        <Stack>
          <Stack direction={'row'} justifyContent={'space-between'} my={2}>
            <Typography variant='body2'>Total:</Typography>
            <Typography variant='body2'>{cartTotalPrice} EUR</Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Button
              disabled={isCartEmpty}
              onClick={resetCart}
              variant={'outlined'}
            >
              Empty Cart
            </Button>
            <Button
              disabled={isCartEmpty}
              onClick={handleCheckout}
              variant={'contained'}
            >
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Cart
