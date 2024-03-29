export const COLOR_SCHEMES = {
  dark: 'dark',
  light: 'light',
} as const

export type ColorSchemes = keyof typeof COLOR_SCHEMES

export type Setting = {
  theme: ColorSchemes | null
  inWarning: boolean
}
