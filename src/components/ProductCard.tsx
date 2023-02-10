import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

interface ProductCardProps {
  id: string
  name: string
  price: number
  imageUrl: string
  stock: number
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  stock,
}: ProductCardProps) => {
  const navigate = useNavigate()
  const itemOutOfStock = Number(stock) === 0

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
          {itemOutOfStock && (
            <Box mb={1}>
              <Chip label='Out of stock' color='error' size='small' />
            </Box>
          )}
          <Typography gutterBottom variant='h4' component='div'>
            {name}
          </Typography>
          <Typography variant='body2'>{`${price} EUR`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
