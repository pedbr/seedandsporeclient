import { Box, Grid, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <Grid container mb={2}>
      <Grid item xs={12} mb={2}>
        <Typography>{t('checkout.personalInfo')}</Typography>
      </Grid>

      <Grid item xs={12} mb={2}>
        <TextField
          label={t('checkout.fullName')}
          defaultValue={orderFullName}
          fullWidth
          onChange={(e) => setOrderFullName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={8} mb={2} pr={{ xs: 0, md: 2 }}>
        <TextField
          label={t('checkout.email')}
          defaultValue={orderEmail}
          fullWidth
          onChange={(e) => setOrderEmail(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={4} mb={2}>
        <TextField
          label={t('checkout.phone')}
          defaultValue={orderPhoneNumber}
          fullWidth
          onChange={(e) => setOrderPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <Box p={2} bgcolor={'branding.mushroom'} borderRadius={'12px'}>
          <Typography variant='body2'>{t('checkout.importantNote')}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          label={t('checkout.deliveryAddress')}
          defaultValue={orderDeliveryAddress}
          fullWidth
          onChange={(e) => setOrderDeliveryAddress(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={3} mb={2} pr={{ xs: 0, md: 2 }}>
        <TextField
          label={t('checkout.postCode')}
          defaultValue={orderDeliveryPostCode}
          fullWidth
          onChange={(e) => setOrderDeliveryPostCode(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={5} mb={2} pr={{ xs: 0, md: 2 }}>
        <TextField
          label={t('checkout.location')}
          defaultValue={orderDeliveryLocation}
          fullWidth
          onChange={(e) => setOrderDeliveryLocation(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4} mb={2}>
        <TextField
          label={t('checkout.country')}
          defaultValue={'Portugal'}
          value={'Portugal'}
          fullWidth
          disabled
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          label={t('checkout.billingAddress')}
          defaultValue={orderBillingAddress}
          fullWidth
          onChange={(e) => setOrderBillingAddress(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default UserInfoElement
