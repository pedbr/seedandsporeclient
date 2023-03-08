import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import { getActualPrice } from '../utils'

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  stock: number
  discount: number
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  stock,
  discount,
}: ProductCardProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const itemOutOfStock = Number(stock) === 0
  const isDiscountActive = discount > 0

  return (
    <Card sx={{ maxWidth: 400 }} elevation={0} onClick={() => null}>
      <CardActionArea onClick={() => navigate(`/store/product/${id}`)}>
        <CardMedia
          component='img'
          height='450'
          image={imageUrl || PRODUCT_DEFAULT_IMAGE}
          alt='product'
        />
        <CardContent>
          <Stack direction={'row'} spacing={2}>
            {itemOutOfStock && (
              <Box mb={1}>
                <Chip
                  label={t('store.outOfStock')}
                  color='error'
                  size='small'
                />
              </Box>
            )}
            {isDiscountActive && (
              <Box mb={1}>
                <Chip
                  label={`${discount}% ${t('store.discount')}`}
                  color='success'
                  size='small'
                />
              </Box>
            )}
          </Stack>
          <Typography gutterBottom variant='h4' component='div'>
            {name}
          </Typography>
          {isDiscountActive && (
            <Typography
              sx={{
                textDecoration: 'line-through',
              }}
              variant='body2'
            >{`${price} EUR`}</Typography>
          )}
          <Typography
            color={isDiscountActive ? 'success.main' : 'text.primary'}
            variant='body2'
          >{`${getActualPrice(price, discount)} EUR`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
