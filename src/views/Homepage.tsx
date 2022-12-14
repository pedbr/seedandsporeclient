import { alpha, Box, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router'

import Button from '../components/Button'
import { IMAGES } from '../constants'

const Homepage = () => {
  const navigate = useNavigate()
  const { palette } = useTheme()
  const { t } = useTranslation()
  return (
    <Stack>
      <Box
        alignItems={'center'}
        display={'flex'}
        justifyContent={'center'}
        height={'100vh'}
        width={'100vw'}
        sx={{
          backgroundImage: `url(${IMAGES.landingPage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Box
          color={'common.white'}
          bgcolor={alpha(palette.common.black, 0.2)}
          height={'100%'}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography color={'branding.mushroom'} mb={2} variant='h1'>
            {t('homepageHeader')}
          </Typography>
          <Typography color={'branding.mushroom'} variant='h4' fontWeight={500}>
            {t('homepageSubheader')}
          </Typography>
        </Box>
      </Box>
      <Box
        alignItems={'center'}
        display={'flex'}
        justifyContent={'center'}
        height={'70vh'}
        width={'100vw'}
      >
        <Grid container px={12} spacing={10}>
          <Grid item xs={5} display={'flex'} justifyContent={'flex-end'}>
            <Box
              width={'450px'}
              height={'400px'}
              sx={{
                backgroundImage: `url(${'https://firebasestorage.googleapis.com/v0/b/seedandsporept.appspot.com/o/diogo-wiebke.png?alt=media&token=2ae64fa0-9db3-418b-9fa5-8d0939986a95'})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <Stack>
              <Typography variant={'h2'} mb={2}>
                {t('homepageAboutHeader')}
              </Typography>
              <Typography variant={'body1'} mb={2}>
                {t('homepageAboutText')}
              </Typography>
              <Button label={'CONTACT'} color={'black'} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        height={'600px'}
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundImage: `url(${IMAGES.ctaSection})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Button
          label={'KNOW OUR PRODUCTS'}
          color={'black'}
          customColor={'branding.pomegranate'}
          onClick={() => navigate('/store')}
        />
      </Box>
    </Stack>
  )
}

export default Homepage
