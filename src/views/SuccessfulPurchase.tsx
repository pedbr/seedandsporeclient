import { Box, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { api } from '../api'
import useStore from '../store'
import { OrderType } from '../types/orders'

const SuccessfulPurchase = () => {
  const [searchParams] = useSearchParams()
  const { currentOrder } = useStore()

  const paymentStatus = searchParams.get('redirect_status')

  const mutation = useMutation((order: OrderType) => {
    return api.patch(`/orders/${order.id}`, { ...order, status: 'pending' })
  })

  useEffect(() => {
    const updateOrder = async () => {
      if (!currentOrder || paymentStatus !== 'succeeded') return null
      await mutation.mutate(currentOrder)
    }
    updateOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder, paymentStatus])

  if (!currentOrder) {
    return (
      <Box>
        <Typography>There was an error creating your order.</Typography>
      </Box>
    )
  }

  const getMessage = () => {
    switch (paymentStatus) {
      case 'succeeded':
        return 'Payment succeeded!'

      case 'processing':
        return 'Your payment is processing.'

      case 'requires_payment_method':
        return 'Your payment was not successful, please try again.'

      default:
        return 'Something went wrong.'
    }
  }

  return (
    <Box>
      <Typography variant={'h1'}>{getMessage()}</Typography>
    </Box>
  )
}

export default SuccessfulPurchase
