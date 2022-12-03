import { Box, Grid } from '@mui/material'

import ProductCard from '../components/ProductCard'
import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'

const Products = () => {
  const { data, isFetching, error } = useFetchData<ProductType>(
    'products',
    '/products'
  )

  if (isFetching) return <Box>{'Loading...'}</Box>

  if (error) return <Box>{'An error ocurred...'}</Box>

  return (
    <Grid container pt={'92px'} px={14}>
      {data?.map((product) => (
        <Grid item xs={4} p={4} key={product.id}>
          <ProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            weight={product.weight}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Products
