import { alpha, Box, Grid, Stack, Typography, useTheme } from '@mui/material'

import { useNavigate } from 'react-router'

import Button from '../components/Button'
import { IMAGES } from '../constants'

const Homepage = () => {
  const navigate = useNavigate()
  const { palette } = useTheme()
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
            NOURISHING OUR LOCAL COMMUNITY
          </Typography>
          <Typography color={'branding.mushroom'} variant='h4' fontWeight={500}>
            - OPORTO URBAN MUSHROOM FARM -
          </Typography>
        </Box>
      </Box>
      {/* <Box
        alignItems={'center'}
        display={'flex'}
        justifyContent={'center'}
        height={'70vh'}
        width={'100vw'}
      >
        <Grid container px={12}>
          <Grid item xs={4} display={'flex'} justifyContent={'center'}>
            <ImageTextCircle
              label='OPORTO'
              imageUrl={
                'https://firebasestorage.googleapis.com/v0/b/seedandsporept.appspot.com/o/mushroom-table.jpg?alt=media&token=6d20fbdf-3301-4961-86a3-9c9652bfa8a4'
              }
            />
          </Grid>
          <Grid item xs={4} display={'flex'} justifyContent={'center'}>
            <ImageTextCircle
              label='URBAN'
              imageUrl='https://firebasestorage.googleapis.com/v0/b/seedandsporept.appspot.com/o/mushroom-mix.jpg?alt=media&token=b7c51ca6-67dc-45de-b492-53d24a6404fd'
            />
          </Grid>
          <Grid item xs={4} display={'flex'} justifyContent={'center'}>
            <ImageTextCircle
              label={'FARM'}
              imageUrl={
                'https://firebasestorage.googleapis.com/v0/b/seedandsporept.appspot.com/o/mushroom-light.jpg?alt=media&token=80d18442-ba32-4394-8302-7cc56e598003'
              }
            />
          </Grid>
        </Grid>
      </Box> */}
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
                THE HEARTS BEHIND THIS PROJECT
              </Typography>
              <Typography variant={'body1'} mb={2}>
                We started growing Gourmet Oyster Mushrooms because we wanted to
                learn how to feed ourselves in a more independent, healthy way
                and provide tasty local food for our neighborhood. Oyster
                Mushrooms crossed our path and we were fascinated by their
                health potential. Additionally, we were able to start growing
                them in our small vertical space in the garage in Porto. Who are
                we? Wiebke and Diogo, a Portuguese-German couple with
                backgrounds in landscaping and aeronautical engineering. In
                October 2021, we started our first experiences with Mushrooms
                and from April 2022, we consistently grew them in our self-built
                fruiting rooms in the garage. Now we are Mushroom farmers and
                grateful to be able to work every day with such fascinating
                beings.
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
