import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import useFetchData from '../hooks/useFetchData'
import { ProductType } from '../types/products'

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
    <Grid container pt={'92px'} px={{ xs: 2, md: 14 }}>
      {Boolean(data.length) ? (
        data
          .filter((product) => product.active)
          .map((product) => (
            <Grid item xs={12} md={6} lg={4} p={4} key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name[currentLocale]}
                price={product.price}
                imageUrl={product.imageUrl}
                stock={product.stock}
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
