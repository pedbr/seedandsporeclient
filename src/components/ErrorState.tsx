import { Stack, Typography, Box } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const ErrorState = () => {
  return (
    <Stack alignItems={'center'} spacing={1}>
      <Box fontSize={128} display={'flex'} alignItems={'end'}>
        <ErrorOutlineIcon fontSize='inherit' />
      </Box>

      <Typography variant={'button'}>
        Oops! Seems like an error ocurred
      </Typography>
      <Typography variant={'caption'}>
        We're sorry for the inconvenience, please try reloading the page!
      </Typography>
    </Stack>
  )
}

export default ErrorState
