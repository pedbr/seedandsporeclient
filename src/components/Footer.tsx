import { Box, IconButton, Typography } from '@mui/material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  return (
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
  )
}

export default Footer
