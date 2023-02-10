import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { Fragment, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { ICONS, LOGOS } from '../constants'
import useStore from '../store'
import Cart from '../views/Cart'

const Navbar = () => {
  const { itemsInCart } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isCartOpen, setCartOpen] = useState(false)
  const { i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleLocaleSelect = (locale: string) => {
    i18n.changeLanguage(locale)
    setAnchorEl(null)
  }

  const inHomepage = location.pathname === '/'
  const inContactPage = location.pathname === '/contact'

  return (
    <Fragment>
      <Stack
        alignItems={'center'}
        direction={'row'}
        height={40}
        justifyContent={'space-between'}
        p={2}
        position={'sticky'}
        zIndex={2}
        top={0}
        left={0}
        right={0}
        sx={{ backdropFilter: 'blur(6px)' }}
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
            height={'32px'}
            width={'32px'}
            sx={{
              backgroundImage: `url(${LOGOS.stamp.pomegranate})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
          <Typography
            color={`branding.pomegranate`}
            ml={1}
            variant={'h4'}
            fontSize={20}
          >
            SEED AND SPORE
          </Typography>
        </Box>
        <Box
          alignItems={'center'}
          color={'branding.pomegranate'}
          display={'flex'}
        >
          <Button
            onClick={handleClick}
            color={'inherit'}
            sx={{ marginRight: 2 }}
          >
            {i18n.language}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLocaleSelect('en')}>EN</MenuItem>
            <MenuItem onClick={() => handleLocaleSelect('pt')}>PT</MenuItem>
          </Menu>
          {!inHomepage && !inContactPage ? (
            <IconButton
              color={'inherit'}
              onClick={() => setCartOpen(true)}
              sx={{ marginRight: 2 }}
            >
              <Badge badgeContent={itemsInCart}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          ) : (
            <>
              <Tooltip title='Reach out to us!'>
                <IconButton
                  color={'inherit'}
                  sx={{ marginRight: 2 }}
                  onClick={() => navigate('contact')}
                >
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
