import { Fragment, useState } from 'react'
import {
  Badge,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useStore from '../store'
import Cart from '../views/Cart'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const { itemsInCart } = useStore()
  const navigate = useNavigate()
  const [isCartOpen, setCartOpen] = useState(false)

  return (
    <Fragment>
      <Stack
        alignItems={'center'}
        direction={'row'}
        height={40}
        justifyContent={'space-between'}
        p={2}
      >
        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <Typography>Seed and Spore Store</Typography>
        </Box>
        <IconButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={itemsInCart}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Stack>
      <Drawer
        anchor={'right'}
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart onClose={() => setCartOpen(false)} />
      </Drawer>
    </Fragment>
  )
}

export default Navbar
