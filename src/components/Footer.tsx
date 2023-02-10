import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

import { ICONS, LOGOS } from '../constants'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <Box
      alignItems={'center'}
      display={'flex'}
      justifyContent={'space-between'}
      bgcolor={'branding.soil'}
      height={'200px'}
      px={{ xs: 2, md: 14 }}
    >
      <Box
        color={'common.white'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Box
          alignItems={'center'}
          display={'flex'}
          justifyContent={'center'}
          height={'64px'}
          width={'64px'}
          sx={{
            backgroundImage: `url(${LOGOS.stamp.mushroomFilled})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <Typography
          sx={{ display: { xs: 'none', md: 'flex' } }}
          color={'branding.mushroom'}
          mt={1}
          variant={'h4'}
        >
          SEED AND SPORE
        </Typography>
      </Box>
      <Stack spacing={1}>
        <Box color={'common.white'}>
          <IconButton
            href='https://www.instagram.com/seed.and.spore/'
            target={'_blank'}
            color={'inherit'}
            sx={{ marginRight: 2 }}
          >
            <Box
              alignItems={'center'}
              display={'flex'}
              justifyContent={'center'}
              height={'32px'}
              width={'32px'}
              sx={{
                backgroundImage: `url(${ICONS.mushroom.instagram})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </IconButton>
          <IconButton
            href='https://www.facebook.com/SeedandSpore.pt'
            target={'_blank'}
            color={'inherit'}
            sx={{ marginRight: 2 }}
          >
            <Box
              alignItems={'center'}
              display={'flex'}
              justifyContent={'center'}
              height={'32px'}
              width={'32px'}
              sx={{
                backgroundImage: `url(${ICONS.mushroom.facebook})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          </IconButton>
        </Box>
        <Typography
          variant={'caption'}
          color={'branding.mushroom'}
          onClick={() => navigate('/terms-and-conditions', { replace: true })}
          sx={{
            '&:hover': {
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          }}
        >
          Terms and Conditions
        </Typography>
        <Typography variant={'caption'} color={'branding.mushroom'}>
          Seed and Spore 2023
        </Typography>
        <Typography variant={'caption'} color={'branding.mushroom'}>
          All Rights Reserved
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer
