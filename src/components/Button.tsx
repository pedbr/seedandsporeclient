import { Box, Button as MUIButton, Typography } from '@mui/material'

interface ButtonProps {
  label: string
  onClick?: () => void
  color?: 'white' | 'black'
}

const Button = ({ label, onClick, color = 'white' }: ButtonProps) => {
  const isWhiteButton = color === 'white'
  return (
    <Box color={`common.${color}`}>
      <MUIButton
        sx={{
          height: '50px',
          backgroundColor: `common.${color}`,
          borderRadius: 0,
          '&:hover': {
            backgroundColor: !isWhiteButton ? 'DimGray' : 'GhostWhite',
          },
        }}
        onClick={onClick}
        disableElevation
        color={'inherit'}
        variant={'contained'}
      >
        <Typography
          color={`common.${isWhiteButton ? 'black' : 'white'}`}
          variant={'button'}
        >
          {label}
        </Typography>
      </MUIButton>
    </Box>
  )
}

export default Button
