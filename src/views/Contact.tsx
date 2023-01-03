import { Box, Button, Stack, TextField, Typography } from '@mui/material'

const Contact = () => {
  return (
    <Box
      bgcolor={'branding.mushroom'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Stack spacing={2} py={20} width={700}>
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
