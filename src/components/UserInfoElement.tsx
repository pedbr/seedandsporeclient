import { Grid, TextField, Typography } from '@mui/material'
import useStore from '../store'

const UserInfoElement = () => {
  const {
    orderFullName,
    setOrderFullName,
    orderEmail,
    setOrderEmail,
    orderPhoneNumber,
    setOrderPhoneNumber,
    orderDeliveryAddress,
    setOrderDeliveryAddress,
    orderDeliveryPostCode,
    setOrderDeliveryPostCode,
    orderDeliveryLocation,
    setOrderDeliveryLocation,
    orderBillingAddress,
    setOrderBillingAddress,
  } = useStore()
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12}>
        <Typography>Personal Information</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label={'Full Name'}
          defaultValue={orderFullName}
          fullWidth
          onChange={(e) => setOrderFullName(e.target.value)}
        />
      </Grid>

      <Grid item xs={8}>
        <TextField
          label={'Email'}
          defaultValue={orderEmail}
          fullWidth
          onChange={(e) => setOrderEmail(e.target.value)}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label={'Phone number'}
          defaultValue={orderPhoneNumber}
          fullWidth
          onChange={(e) => setOrderPhoneNumber(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label={'Delivery Address'}
          defaultValue={orderDeliveryAddress}
          fullWidth
          onChange={(e) => setOrderDeliveryAddress(e.target.value)}
        />
      </Grid>

      <Grid item xs={5}>
        <TextField
          label={'Post Code'}
          defaultValue={orderDeliveryPostCode}
          fullWidth
          onChange={(e) => setOrderDeliveryPostCode(e.target.value)}
        />
      </Grid>

      <Grid item xs={7}>
        <TextField
          label={'Location'}
          defaultValue={orderDeliveryLocation}
          fullWidth
          onChange={(e) => setOrderDeliveryLocation(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label={'Billing Address'}
          defaultValue={orderBillingAddress}
          fullWidth
          onChange={(e) => setOrderBillingAddress(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default UserInfoElement
