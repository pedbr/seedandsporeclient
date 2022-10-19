import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'

import useStore from '../store'

interface CartProps {
  onClose: () => void
}

const Cart = ({ onClose }: CartProps) => {
  const { cartItems, resetCart, removeFromCart } = useStore()

  console.log('cartItems', cartItems)

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
                  src={item.imageUrl}
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
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button onClick={resetCart} variant={'outlined'}>
            Empty Cart
          </Button>
          <Button variant={'contained'}>Checkout</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Cart
