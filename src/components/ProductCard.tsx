import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  weight: number
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  weight,
}: ProductCardProps) => {
  const navigate = useNavigate()

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
