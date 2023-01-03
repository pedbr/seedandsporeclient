import { useMemo } from 'react'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import ProductCard from '../components/ProductCard'
import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'
import Loader from '../components/Loader'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const Products = () => {
  const { i18n } = useTranslation()

  const currentLocale: string = useMemo(() => i18n.language, [i18n.language])

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
      {Boolean(data.length) ? (
        data.map((product) => (
          <Grid item xs={4} p={4} key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name[currentLocale]}
              description={product.description[currentLocale]}
              price={product.price}
              imageUrl={product.imageUrl}
              weight={product.weight}
            />
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <EmptyState
            header='Our store is currently empty'
            body={
              'We are preparing cool and exciting stuff for you, stay tunned!'
            }
          />
        </Grid>
      )}
    </Grid>
  )
}

export default Products
