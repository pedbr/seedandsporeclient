import { Fragment, useState } from 'react'
import {
  Badge,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Box,
  Button as MuiButton,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

import useStore from '../store'
import Cart from '../views/Cart'
import { useLocation, useNavigate } from 'react-router'
import Button from './Button'

const Navbar = () => {
  const { itemsInCart } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isCartOpen, setCartOpen] = useState(false)

  const inStore = location.pathname.includes('/store')

  return (
    <Fragment>
      <Stack
        alignItems={'center'}
        direction={'row'}
        height={40}
        justifyContent={'space-between'}
        p={2}
        position={'absolute'}
        left={0}
        right={0}
        bgcolor={inStore ? 'common.black' : 'none'}
      >
        <Box
          color={'common.white'}
          display={'flex'}
          alignItems={'center'}
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <RadioButtonCheckedIcon color={'inherit'} />
          <Typography color={'common.white'} ml={1} variant={'subtitle1'}>
            SEED AND SPORE
          </Typography>
        </Box>
        <Box alignItems={'center'} color={'common.white'} display={'flex'}>
          {inStore ? (
            <IconButton color={'inherit'} onClick={() => setCartOpen(true)}>
              <Badge badgeContent={itemsInCart}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          ) : (
            <>
              <Box color={'common.white'} mr={2}>
                <MuiButton color={'inherit'}>CONTACT</MuiButton>
              </Box>
              <IconButton color={'inherit'} sx={{ marginRight: 2 }}>
                <InstagramIcon color={'inherit'} />
              </IconButton>
              <IconButton color={'inherit'} sx={{ marginRight: 2 }}>
                <FacebookIcon color={'inherit'} />
              </IconButton>
              <Button label={'SHOP'} onClick={() => navigate('store')} />
            </>
          )}
        </Box>
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
