import { Fragment, useState } from 'react'
import { Badge, Drawer, IconButton, Stack, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useStore from '../store'
import Cart from '../views/Cart'

const Navbar = () => {
  const { itemsInCart } = useStore()
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
        <Typography>Seed and Spore Store</Typography>
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
