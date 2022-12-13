import { Fragment, useState } from 'react'
import {
  Badge,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Box,
  Tooltip,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import useStore from '../store'
import Cart from '../views/Cart'
import { useLocation, useNavigate } from 'react-router'
import { ICONS, LOGOS } from '../constants'

const Navbar = () => {
  const { itemsInCart } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isCartOpen, setCartOpen] = useState(false)

  const inHomepage = location.pathname === '/'

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
        bgcolor={!inHomepage ? 'branding.pomegranate' : 'none'}
      >
        <Box
          color={'common.white'}
          display={'flex'}
          alignItems={'center'}
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          <Box
            alignItems={'center'}
            display={'flex'}
            justifyContent={'center'}
            height={'56px'}
            width={'56px'}
            sx={{
              backgroundImage: `url(${
                inHomepage ? LOGOS.stamp.soilFilled : LOGOS.stamp.mushroomFilled
              })`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
          <Typography
            color={`branding.${inHomepage ? 'soil' : 'mushroom'}`}
            ml={1}
            variant={'subtitle1'}
            fontSize={28}
          >
            SEED AND SPORE
          </Typography>
        </Box>
        <Box alignItems={'center'} color={'branding.mushroom'} display={'flex'}>
          {!inHomepage ? (
            <IconButton color={'inherit'} onClick={() => setCartOpen(true)}>
              <Badge badgeContent={itemsInCart}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          ) : (
            <>
              <Tooltip title='Reach out to us!'>
                <IconButton color={'inherit'} sx={{ marginRight: 2 }}>
                  <Box
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    height={'40px'}
                    width={'40px'}
                    sx={{
                      backgroundImage: `url(${ICONS.mushroom.contact})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title='Visit our shop'>
                <IconButton
                  color={'inherit'}
                  sx={{ marginRight: 2 }}
                  onClick={() => navigate('store')}
                >
                  <Box
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    height={'40px'}
                    width={'40px'}
                    sx={{
                      backgroundImage: `url(${ICONS.mushroom.cart})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  />
                </IconButton>
              </Tooltip>
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
