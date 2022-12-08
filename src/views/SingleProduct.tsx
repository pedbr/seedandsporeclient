import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useFetchById from '../hooks/useFetchById'
import useStore from '../store'
import { ProductType } from '../types/products'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

// {
//   "weight": "250",
//   "name": "Demo Product",
//   "description": "This is a very nice product",
//   "stock": "50",
//   "price": "20",
//   "createdAt": "2022-11-02T17:28:37.231Z",
//   "id": "3UqRS3QrYBVQAQ4WNguZ",
//   "imageUrl": "https://firebasestorage.googleapis.com/v0/b/seedandsporept.appspot.com/o/products%2Fproduct-70913021066274-14303738991049.jpg?alt=media&token=44e1f6e0-b4f3-4c9c-8992-b8c4fff3e4ca"
// }

const SingleProduct = () => {
  const { productId } = useParams()
  const { addToCart } = useStore()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState('1')
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
      <Box pt={'100px'} px={14} minHeight={'90vh'}>
        Loading...
      </Box>
    )
  if (errorFetching)
    return (
      <Box pt={'100px'} px={14} minHeight={'90vh'}>
        An error ocurred please try again
      </Box>
    )
  if (!data)
    return (
      <Box pt={'100px'} px={14} minHeight={'90vh'}>
        An error ocurred please try again
      </Box>
    )

  const { name, weight, description, price, id, imageUrl } = data

  const handleChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value)
  }

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
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Quantity</InputLabel>
                <Select
                  value={quantity}
                  label='Quantity'
                  onChange={handleChange}
                >
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                  <MenuItem value={'3'}>3</MenuItem>
                  <MenuItem value={'4'}>4</MenuItem>
                  <MenuItem value={'5'}>5</MenuItem>
                  <MenuItem value={'6'}>6</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant={'contained'}
                onClick={() =>
                  addToCart({
                    id,
                    name,
                    description,
                    price,
                    imageUrl,
                    quantity: Number(quantity),
                    weight,
                  })
                }
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
