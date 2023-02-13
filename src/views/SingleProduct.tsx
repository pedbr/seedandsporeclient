import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

import ErrorState from '../components/ErrorState'
import Loader from '../components/Loader'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useFetchById from '../hooks/useFetchById'
import useStore from '../store'
import { CartItem } from '../types/cartItem'
import { ProductType } from '../types/products'

const SingleProduct = () => {
  const { productId } = useParams()
  const { addToCart, cartItems } = useStore()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const { i18n } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const currentLocale: string = useMemo(() => i18n.language, [i18n.language])

  const {
    data,
    isLoading,
    error: errorFetching,
  } = useFetchById<ProductType>(
    `product-${productId}`,
    '/products',
    productId || ''
  )

  if (isLoading)
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        px={14}
        minHeight={'90vh'}
      >
        <Loader />
      </Box>
    )
  if (errorFetching)
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        px={14}
        minHeight={'90vh'}
      >
        <ErrorState />
      </Box>
    )
  if (!data)
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        px={14}
        minHeight={'90vh'}
      >
        <ErrorState />
      </Box>
    )

  const { name, weight, description, price, id, imageUrl, stock } = data

  const currentItemInCart = cartItems.find((i: CartItem) => i.id === id)

  const currentlyAvailableStock = stock - (currentItemInCart?.quantity || 0)

  const itemOutOfStock = Number(data?.stock) === 0

  const handleAddQuantity = () => setQuantity(quantity + 1)
  const handleReduceQuantity = () => setQuantity(quantity - 1)

  return (
    <Box pt={'100px'} px={{ xs: 4, lg: 14 }} minHeight={'90vh'}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={4}>
          <Button
            variant={'outlined'}
            size={'small'}
            onClick={() => navigate('/store')}
            startIcon={<ArrowBackIcon />}
            sx={{ marginLeft: 6.5 }}
          >
            Back to store
          </Button>
        </Grid>
        <Grid item xs={12} lg={4} display={'flex'} justifyContent={'center'}>
          <Box
            height={'500px'}
            width={'500px'}
            sx={{
              backgroundImage: `url(${imageUrl || PRODUCT_DEFAULT_IMAGE})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6} mb={4}>
          <Stack spacing={3}>
            {itemOutOfStock && (
              <Box>
                <Chip label='Out of stock' color='error' size='small' />
              </Box>
            )}
            <Typography color={'branding.soil'} variant={'h2'}>
              {data?.name[currentLocale]}
            </Typography>
            <Stack>
              <Typography variant={'button'} fontSize={'12px'}>
                Price
              </Typography>
              <Typography
                variant={'body1'}
                fontSize={'24px'}
              >{`${data?.price} €/Unit`}</Typography>
            </Stack>

            <Stack>
              <Typography
                variant={'button'}
                fontSize={'12px'}
                color={'text.primary'}
              >
                Description
              </Typography>
              <Typography variant={'body1'}>
                {data?.description[currentLocale]}
              </Typography>
            </Stack>
            {itemOutOfStock ? (
              <Stack>
                <Grid
                  container
                  display={'flex'}
                  width={'fit-content'}
                  bgcolor={'branding.mushroom'}
                  p={2}
                  borderRadius={'12px'}
                >
                  <Grid item xs={12} lg={8}>
                    <Typography width={'400px'} variant={'caption'} mr={2}>
                      This product is currently out of stock, reach out to us to
                      let us know about your interest and we will do our best to
                      re-stock as soon as possible
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={4}
                    display={'flex'}
                    justifyContent={{ md: 'flex-start', lg: 'flex-end' }}
                  >
                    <Button
                      variant='outlined'
                      onClick={() => navigate('/contact')}
                      sx={{ marginTop: { xs: 2, lg: 0 } }}
                    >
                      Contact us!
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            ) : (
              <Stack spacing={2} width={'300px'} pt={2}>
                <Box display={'flex'} alignItems={'center'}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ readOnly: true }}
                    label={'Quantity'}
                    value={String(quantity)}
                    disabled={currentlyAvailableStock === 0}
                    sx={{
                      marginRight: 2,
                      width: '100px',
                    }}
                  />
                  <ButtonGroup variant='contained'>
                    <Button
                      onClick={handleReduceQuantity}
                      disabled={quantity === 0 || currentlyAvailableStock === 0}
                    >
                      -
                    </Button>
                    <Button
                      onClick={handleAddQuantity}
                      disabled={
                        quantity === currentlyAvailableStock ||
                        currentlyAvailableStock === 0
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>

                <Button
                  variant={'contained'}
                  disabled={quantity === 0 || currentlyAvailableStock === 0}
                  onClick={() => {
                    setQuantity(quantity === currentlyAvailableStock ? 0 : 1)
                    addToCart({
                      id,
                      name: name[currentLocale],
                      description: description[currentLocale],
                      price,
                      imageUrl,
                      quantity: Number(quantity),
                      weight,
                    })
                    enqueueSnackbar(
                      'This product was added to your cart! 🎉 ',
                      {
                        variant: 'success',
                        anchorOrigin: {
                          horizontal: 'center',
                          vertical: 'bottom',
                        },
                      }
                    )
                  }}
                  size='small'
                >
                  Add to cart
                </Button>
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SingleProduct
