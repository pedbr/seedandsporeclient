import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

interface ProductCardProps {
  name: string
  description: string
  price: number
  imageUrl: string
}

const ProductCard = ({
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' image={imageUrl} alt='product' />
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
        <Button size='small'>Buy</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
