import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const ErrorState = () => {
  const { t } = useTranslation()
  return (
    <Stack alignItems={'center'} spacing={1}>
      <Box fontSize={128} display={'flex'} alignItems={'end'}>
        <ErrorOutlineIcon fontSize='inherit' />
      </Box>

      <Typography variant={'button'}>{t('errorState.header')}</Typography>
      <Typography variant={'caption'}>{t('errorState.body')}</Typography>
    </Stack>
  )
}

export default ErrorState
