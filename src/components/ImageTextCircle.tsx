import { Box, Typography } from '@mui/material'

interface ImageTextCircleProps {
  label: string
  imageUrl: string
  width?: string
  height?: string
}

const ImageTextCircle = ({
  label,
  imageUrl,
  width = '300px',
  height = '300px',
}: ImageTextCircleProps) => {
  return (
    <Box
      height={height}
      width={width}
      borderRadius={'100%'}
      alignItems={'center'}
      display={'flex'}
      justifyContent={'center'}
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box
        color={'common.white'}
        bgcolor={'rgba(0, 0, 0, 0.3)'}
        borderRadius={'100%'}
        height={'100%'}
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography color={'common.white'} mb={2} variant='h3'>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

export default ImageTextCircle
