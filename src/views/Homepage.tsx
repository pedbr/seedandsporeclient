import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useNavigate } from 'react-router'

import Button from '../components/Button'
import ImageTextCircle from '../components/ImageTextCircle'

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <Stack>
      <Box
        alignItems={'center'}
        display={'flex'}
        justifyContent={'center'}
        height={'100vh'}
        width={'100vw'}
        sx={{
          backgroundImage:
            'url(https://firebasestorage.googleapis.com/v0/b/seedandsporept.appspot.com/o/mushroom-earth.jpg?alt=media&token=9e78851b-533c-43ed-b035-45958c719cca)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Box
          color={'common.white'}
          bgcolor={'rgba(0, 0, 0, 0.3)'}
          height={'100%'}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography color={'common.white'} mb={2} variant='h1'>
            NOURISHING OUR LOCAL COMMUNITY
          </Typography>
          <Button label={'SHOP NOW'} onClick={() => navigate('store')} />
        </Box>
      </Box>
      <Box
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
      </Box>
      <Box
        alignItems={'center'}
        display={'flex'}
        justifyContent={'center'}
        height={'70vh'}
        width={'100vw'}
      >
        <Grid container px={12} spacing={10}>
          <Grid item xs={5}>
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
                LOREM IPSUM DOLOR
              </Typography>
              <Typography variant={'body1'} mb={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <Button label={'CONTACT'} color={'black'} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        alignItems={'center'}
        display={'flex'}
        justifyContent={'space-between'}
        bgcolor={'common.black'}
        height={'200px'}
        width={'100vw'}
      >
        <Box color={'common.white'} display={'flex'} alignItems={'center'}>
          <RadioButtonCheckedIcon color={'inherit'} />
          <Typography color={'common.white'} ml={1} variant={'subtitle1'}>
            SEED AND SPORE
          </Typography>
        </Box>
        <Box color={'common.white'}>
          <IconButton color={'inherit'} sx={{ marginRight: 2 }}>
            <InstagramIcon color={'inherit'} />
          </IconButton>
          <IconButton color={'inherit'} sx={{ marginRight: 2 }}>
            <FacebookIcon color={'inherit'} />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  )
}

export default Homepage
