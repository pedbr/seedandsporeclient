import MoreVertIcon from '@mui/icons-material/MoreVert'
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
  const { i18n, t } = useTranslation()

  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] =
    useState<null | HTMLElement>(null)
  const languageMenuOpen = Boolean(languageMenuAnchorEl)
  const handleLanguageMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLanguageMenuAnchorEl(event.currentTarget)
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLocaleSelect = (locale: string) => {
    i18n.changeLanguage(locale)
    setLanguageMenuAnchorEl(null)
  }

  const inHomepage = location.pathname === '/'
  const inContactPage = location.pathname === '/contact'
  const inTermsPage = location.pathname === '/terms-and-conditions'

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
            sx={{ display: { xs: 'none', md: 'flex' } }}
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
            onClick={handleLanguageMenuClick}
            color={'inherit'}
            sx={{ marginRight: 2 }}
          >
            {i18n.language}
          </Button>
          <Menu
            anchorEl={languageMenuAnchorEl}
            open={languageMenuOpen}
            onClose={() => setLanguageMenuAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLocaleSelect('en')}>EN</MenuItem>
            <MenuItem onClick={() => handleLocaleSelect('pt')}>PT</MenuItem>
          </Menu>
          {!inHomepage && !inContactPage && !inTermsPage ? (
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
              <Box
                color={'branding.pomegranate'}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <IconButton color='inherit' onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 58 * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem onClick={() => navigate('contact')}>
                    {t('navbar.contact')}
                  </MenuItem>
                  <MenuItem onClick={() => navigate('store')}>
                    {t('navbar.store')}
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Tooltip title={t('navbar.reachOut')}>
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
                <Tooltip title={t('navbar.visitShop')}>
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
              </Box>
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
