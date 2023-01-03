import { Box } from '@mui/material'

const Loader = () => {
  return (
    <Box
      height={250}
      width={250}
      sx={{
        backgroundImage: `url(/img/seed-and-spore-loader.gif)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    />
  )
}

export default Loader
