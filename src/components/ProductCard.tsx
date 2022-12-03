import {
  Button,
  Card,
  CardActionArea,
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
    <Card sx={{ maxWidth: 400 }} elevation={0} onClick={() => null}>
      <CardActionArea>
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
          {/* <Typography variant='body2'>{description}</Typography> */}
          <Typography variant='body2'>{`${price} EUR`}</Typography>
        </CardContent>
        {/* <CardActions>
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
      </CardActions> */}
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
