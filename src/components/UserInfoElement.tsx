import { Box, Grid, TextField, Typography } from '@mui/material'
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
    <Grid container mb={2}>
      <Grid item xs={12} mb={2}>
        <Typography>Personal Information</Typography>
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label={'Full Name'}
          defaultValue={orderFullName}
          fullWidth
          onChange={(e) => setOrderFullName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={8} mb={2} pr={{ xs: 0, md: 2 }}>
        <TextField
          label={'Email'}
          defaultValue={orderEmail}
          fullWidth
          onChange={(e) => setOrderEmail(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={4} mb={2}>
        <TextField
          label={'Phone number'}
          defaultValue={orderPhoneNumber}
          fullWidth
          onChange={(e) => setOrderPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <Box p={2} bgcolor={'branding.mushroom'} borderRadius={'12px'}>
          <Typography variant='body2'>
            IMPORTANT NOTE: As of now, we are only able to ship to Portugal.
            We're working hard to establish the best logistics possible so we
            can ship our products abroad in a way that they arrive to you in the
            best conditions.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          label={'Delivery Address'}
          defaultValue={orderDeliveryAddress}
          fullWidth
          onChange={(e) => setOrderDeliveryAddress(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={3} mb={2} pr={{ xs: 0, md: 2 }}>
        <TextField
          label={'Post Code'}
          defaultValue={orderDeliveryPostCode}
          fullWidth
          onChange={(e) => setOrderDeliveryPostCode(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={5} mb={2} pr={{ xs: 0, md: 2 }}>
        <TextField
          label={'Location'}
          defaultValue={orderDeliveryLocation}
          fullWidth
          onChange={(e) => setOrderDeliveryLocation(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4} mb={2}>
        <TextField
          label={'Country'}
          defaultValue={'Portugal'}
          value={'Portugal'}
          fullWidth
          disabled
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} mb={2}>
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
