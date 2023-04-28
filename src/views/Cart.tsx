import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { api } from '../api'
import EmptyState from '../components/EmptyState'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useStore from '../store'
import { formatNumberToTwoDecimalString } from '../utils'

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
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const isCartEmpty = !Boolean(cartItems.length)

  const shippingCost = 0

  const totalOrderCost = cartTotalPrice + shippingCost

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.post('/orders', {
        products: cartItems,
        productsPrice: cartTotalPrice,
        shippingCost,
        totalPrice: totalOrderCost,
      })
      if (data?.data) {
        setCurrentOrder(data.data)
        navigate('/checkout')
        onClose()
      } else {
        throw new Error()
      }
    } catch (error) {
      enqueueSnackbar(t('cart.createOrderError'), {
        variant: 'error',
      })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box height={'100vh'} p={2} width={350} bgcolor={'ghostwhite'}>
      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <IconButton onClick={onClose}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>{t('cart.header')}</Typography>
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
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
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
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => {
                      navigate(`/store/product/${item.id}`)
                      onClose()
                    }}
                  />
                  <Stack>
                    <Typography
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        },
                      }}
                      variant={'body1'}
                      onClick={() => {
                        navigate(`/store/product/${item.id}`)
                        onClose()
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                      variant={'caption'}
                    >
                      {item.description}
                    </Typography>
                    <Typography variant={'body2'}>
                      {t('cart.costUni')}{' '}
                      {formatNumberToTwoDecimalString(item.price)} €
                    </Typography>
                    <Typography variant={'body2'}>
                      {t('cart.quantity')} {item.quantity}
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
                header={t('cart.emptyStateHeader')}
                body={t('cart.emptyStateBody')}
              />
            </Box>
          )}
        </Stack>
        <Stack>
          <Stack direction={'row'} justifyContent={'space-between'} my={2}>
            <Typography variant='body2'>{t('cart.total')}</Typography>
            <Typography variant='body2'>
              {formatNumberToTwoDecimalString(cartTotalPrice)} EUR
            </Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <LoadingButton
              loading={isLoading}
              disabled={isCartEmpty}
              onClick={resetCart}
              variant={'outlined'}
            >
              {t('cart.emptyCart')}
            </LoadingButton>
            <LoadingButton
              loading={isLoading}
              disabled={isCartEmpty}
              onClick={handleCheckout}
              variant={'contained'}
            >
              {t('cart.checkout')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Cart
