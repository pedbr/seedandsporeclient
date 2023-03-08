import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { api } from '../api'
import { IMAGES } from '../constants'

interface ContactValues {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const { handleSubmit, register, reset } = useForm<ContactValues>()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const mutation = useMutation((values: ContactValues) => {
    return api.post(`/emails/contact`, {
      from: values.email,
      name: values.name,
      message: values.message,
    })
  })

  const onSubmit = async (values: ContactValues) => {
    try {
      await mutation.mutateAsync(values)
      if (mutation.isSuccess) {
        reset()
        enqueueSnackbar(t('contactForm.success'), {
          variant: 'success',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom',
          },
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      enqueueSnackbar(t('contactForm.error'), {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'bottom',
        },
      })
    }
  }

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
      <form
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmit)}
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
            <Typography variant={'h2'}>{t('contactForm.header')}</Typography>
          </Box>
          <TextField
            fullWidth
            label={t('contactForm.name')}
            {...register('name', { required: true })}
          />
          <TextField
            fullWidth
            label={t('contactForm.email')}
            {...register('email', { required: true })}
          />
          <TextField
            fullWidth
            label={t('contactForm.message')}
            multiline
            rows={7}
            {...register('message', { required: true })}
          />
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <LoadingButton
              loading={mutation.isLoading}
              type={'submit'}
              variant={'contained'}
            >
              {t('contactForm.send')}
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}

export default Contact
