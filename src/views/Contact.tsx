import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { IMAGES } from '../constants'

const Contact = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      px={2}
      sx={{
        backgroundImage: `url(${IMAGES.ctaSection})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Stack
        spacing={2}
        p={4}
        width={700}
        borderRadius={16}
        bgcolor={'branding.sunlight'}
      >
        <Box
          mb={2}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'}>We want to hear from you!</Typography>
        </Box>
        <TextField fullWidth label={'Name'} />
        <TextField fullWidth label={'Email'} />
        <TextField fullWidth label={'Message'} multiline rows={7} />
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Button variant={'contained'}>Send</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Contact
