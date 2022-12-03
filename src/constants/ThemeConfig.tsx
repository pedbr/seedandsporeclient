import React, { useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import typography from './typography'
import palette from './palette'
import useStore from '../store'

interface Props {
  children: React.ReactNode | JSX.Element
}

const ThemeConfig = ({ children }: Props): JSX.Element => {
  const { theme: themeVariant } = useStore()

  const themeOptions = useMemo(
    () => ({
      palette: palette[themeVariant],

      typography,

      borderRadius: {
        paper: 20,
        popper: 12,
        button: 8,
        image: 4,
      },
    }),
    [themeVariant]
  )

  const theme = useMemo(() => createTheme(themeOptions), [themeOptions])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeConfig
