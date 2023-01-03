import { useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useFetchById from '../hooks/useFetchById'
import useStore from '../store'
import { ProductType } from '../types/products'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import { CartItem } from '../types/cartItem'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'

const SingleProduct = () => {
  const { productId } = useParams()
  const { addToCart, cartItems } = useStore()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
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

  const handleAddQuantity = () => setQuantity(quantity + 1)
  const handleReduceQuantity = () => setQuantity(quantity - 1)

  return (
    <Box pt={'100px'} px={14} minHeight={'90vh'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant={'outlined'}
            size={'small'}
            onClick={() => navigate('/store')}
          >
            <ArrowBackIcon sx={{ marginRight: 1 }} />
            Back to store
          </Button>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
          <Box
            height={'400px'}
            width={'400px'}
            sx={{
              backgroundImage: `url(${imageUrl || PRODUCT_DEFAULT_IMAGE})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <Typography variant={'h2'}>{data?.name}</Typography>
            <Stack>
              <Typography variant={'button'}>Price</Typography>
              <Typography
                variant={'body1'}
              >{`${data?.price} EUR/Unit`}</Typography>
            </Stack>

            <Stack>
              <Typography variant={'button'}>Description</Typography>
              <Typography variant={'caption'}>{data?.description}</Typography>
            </Stack>
            <Stack>
              <Typography variant={'button'}>Weight</Typography>
              <Typography variant={'caption'}>{`${data?.weight}G`}</Typography>
            </Stack>
            <Stack spacing={2} width={'300px'} pt={2}>
              <Box display={'flex'} alignItems={'center'}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ readOnly: true }}
                  label={'Quantity'}
                  value={String(quantity)}
                  sx={{
                    marginRight: 2,
                  }}
                />
                <ButtonGroup variant='contained'>
                  <Button
                    onClick={handleReduceQuantity}
                    disabled={quantity === 0}
                  >
                    -
                  </Button>
                  <Button
                    onClick={handleAddQuantity}
                    disabled={quantity === currentlyAvailableStock}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Box>

              <Button
                variant={'contained'}
                disabled={quantity === 0}
                onClick={() => {
                  setQuantity(quantity === currentlyAvailableStock ? 0 : 1)
                  addToCart({
                    id,
                    name,
                    description,
                    price,
                    imageUrl,
                    quantity: Number(quantity),
                    weight,
                  })
                }}
                size='small'
              >
                Add to cart
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SingleProduct
