import { Box, Stack } from '@mui/material'

import ProductCard from '../components/ProductCard'
import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'

const Products = () => {
  const { data, isFetching, error } = useFetchData('products', '/products')

  if (isFetching) return <Box>{'Loading...'}</Box>

  if (error) return <Box>{'An error ocurred...'}</Box>

  return (
    <Stack direction={'row'} spacing={2}>
      {data?.map((product: ProductType) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </Stack>
  )
}

export default Products
