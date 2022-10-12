import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useGetImage } from '../hooks/useGetImage'
import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Ls6rBIu2L2tk8sMYsQJSw1v5PLPiIKbKisgd3lrbwgsYDpQjnmKaHxQ7CbFDjNWUNfuVTvZf3vXC8LVbACDHKXT00q1sk7i0r'
)

interface ProductCardProps {
  name: string
  description: string
  price: number
  imagePath: string
}

const ProductCard = ({
  name,
  description,
  price,
  imagePath,
}: ProductCardProps) => {
  const { imageUrl, isImageLoading } = useGetImage('product-images', imagePath)

  if (isImageLoading) return <Box>Loading...</Box>

  const handleClick = async () => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: 'price_1Ls7JWIu2L2tk8sMEYuVgwqz', // Replace with the ID of your price
            quantity: 1,
          },
        ],
        mode: 'payment',
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'https://example.com/cancel',
      })
    }
  }

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
        <Button onClick={() => handleClick()} size='small'>
          Buy
        </Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
