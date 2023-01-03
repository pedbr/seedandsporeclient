import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'

type EmptyStateProps = {
  header: string
  body: string
  icon?: JSX.Element
  iconSize?: number
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <BeachAccessIcon />,
  iconSize = 128,
  header,
  body,
}) => {
  return (
    <Stack alignItems={'center'} spacing={1}>
      <Box fontSize={iconSize} display={'flex'} alignItems={'end'}>
        {React.cloneElement(icon, { fontSize: 'inherit' })}
      </Box>
      <Typography variant={'button'}>{header}</Typography>
      <Typography variant={'caption'}>{body}</Typography>
    </Stack>
  )
}

export default EmptyState
