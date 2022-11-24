import { Grid, TextField, Typography } from '@mui/material'
import useStore from '../store'

const UserInfoElement = () => {
  const {
    setOrderFullName,
    setOrderEmail,
    setOrderPhoneNumber,
    setOrderDeliveryAddress,
    setOrderDeliveryPostCode,
    setOrderDeliveryLocation,
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
          fullWidth
          onChange={(e) => setOrderFullName(e.target.value)}
        />
      </Grid>

      <Grid item xs={8}>
        <TextField
          label={'Email'}
          fullWidth
          onChange={(e) => setOrderEmail(e.target.value)}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label={'Phone number'}
          fullWidth
          onChange={(e) => setOrderPhoneNumber(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label={'Delivery Address'}
          fullWidth
          onChange={(e) => setOrderDeliveryAddress(e.target.value)}
        />
      </Grid>

      <Grid item xs={5}>
        <TextField
          label={'Post Code'}
          fullWidth
          onChange={(e) => setOrderDeliveryPostCode(e.target.value)}
        />
      </Grid>

      <Grid item xs={7}>
        <TextField
          label={'Location'}
          fullWidth
          onChange={(e) => setOrderDeliveryLocation(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label={'Billing Address'}
          fullWidth
          onChange={(e) => setOrderBillingAddress(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default UserInfoElement
