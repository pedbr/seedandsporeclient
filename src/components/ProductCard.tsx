import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { PRODUCT_DEFAULT_IMAGE } from '../constants'
import useStore from '../store'

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
  const { addToCart } = useStore()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='140'
        image={imageUrl || PRODUCT_DEFAULT_IMAGE}
        alt='product'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {`${price} EUR`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() =>
            addToCart({
              id,
              name,
              description,
              price,
              imageUrl,
              quantity: 1,
              weight,
            })
          }
          size='small'
        >
          Add to cart
        </Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
