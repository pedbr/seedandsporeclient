// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PaletteOptions, Palette } from '@mui/material/styles'

declare module '@mui/material/styles' {
  export interface Palette {
    branding: {
      mushroom: string
      soil: string
      pomegranate: string
      dryLeaf: string
      sunlight: string
      forest: string
    }
  }
  export interface PaletteOptions {
    branding: {
      mushroom: string
      soil: string
      pomegranate: string
      dryLeaf: string
      sunlight: string
      forest: string
    }
  }
}
