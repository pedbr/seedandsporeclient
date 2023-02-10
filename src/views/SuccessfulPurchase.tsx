import { Box, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { api } from '../api'
import useStore from '../store'
import { OrderType } from '../types/orders'

const SuccessfulPurchase = () => {
  const [searchParams] = useSearchParams()
  const {
    currentOrder,
    resetCart,

    orderFullName,
    orderEmail,
    orderPhoneNumber,
    orderDeliveryAddress,
    orderDeliveryPostCode,
    orderDeliveryLocation,
    orderBillingAddress,
  } = useStore()

  const paymentStatus = searchParams.get('redirect_status')

  const mutation = useMutation(() => {
    return api.patch(`/orders/userInfo/${currentOrder?.id || ''}`, {
      orderFullName,
      orderEmail,
      orderPhoneNumber,
      orderDeliveryAddress,
      orderDeliveryPostCode,
      orderDeliveryLocation,
      orderBillingAddress,
    })
  })

  const confirmationMutation = useMutation((order: OrderType) => {
    return api.post(`/orders/confirm/${order.id}`, { orderEmail })
  })

  useEffect(() => {
    const updateOrder = async () => {
      if (!currentOrder || paymentStatus !== 'succeeded') return null
      try {
        await mutation.mutateAsync()
        await confirmationMutation.mutateAsync(currentOrder)
        resetCart()
      } catch (error) {
        console.error(error)
      }
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
    <Box p={10}>
      <Typography variant={'h1'}>{getMessage()}</Typography>
    </Box>
  )
}

export default SuccessfulPurchase
