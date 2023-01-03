import { Box, Grid } from '@mui/material'

import ProductCard from '../components/ProductCard'
import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'

const Products = () => {
  const { data, isLoading, error } = useFetchData<ProductType>(
    'products',
    '/products'
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

  if (error)
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

  return (
    <Grid container pt={'92px'} px={14} minHeight={'90vh'}>
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
