import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
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
        enqueueSnackbar(
          'Your message has been sent! We will get back to you shortly',
          {
            variant: 'success',
            anchorOrigin: {
              horizontal: 'center',
              vertical: 'bottom',
            },
          }
        )
      } else {
        throw new Error()
      }
    } catch (error) {
      enqueueSnackbar(
        'There was an error sending this message, please try again',
        {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom',
          },
        }
      )
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
            <Typography variant={'h2'}>We want to hear from you!</Typography>
          </Box>
          <TextField
            fullWidth
            label={'Name'}
            {...register('name', { required: true })}
          />
          <TextField
            fullWidth
            label={'Email'}
            {...register('email', { required: true })}
          />
          <TextField
            fullWidth
            label={'Message'}
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
              Send
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}

export default Contact
