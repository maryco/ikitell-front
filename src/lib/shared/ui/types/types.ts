export const UI_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const

export type UiSizes = keyof typeof UI_SIZES

export type ButtonTheme = {
  color: { bg: string; focus: string; hover: string }
  ripple: { bg: string }
}

export const BUTTON_THEMES: Record<string, ButtonTheme> = {
  primary: {
    color: {
      bg: 'bg-primary-0',
      focus: 'focus-within:bg-primary-300/80',
      hover: 'hover:bg-primary-300/80',
    },
    ripple: { bg: '!bg-primary-700' },
  },
  secondary: {
    color: {
      bg: 'bg-secondary-0',
      focus: 'focus-within:bg-secondary-500/80',
      hover: 'hover:bg-secondary-500/80',
    },
    ripple: { bg: '!bg-secondary-700' },
  },
  transparent: {
    color: {
      bg: 'bg-transparent',
      focus: 'focus-within:bg-gray-dark-500/80',
      hover: 'hover:bg-gray-dark-500/80',
    },
    ripple: { bg: '!bg-gray-dark-500' },
  },
} as const

export type SwitchTheme = {
  border: string
  bg: string
  fill: string
  fillOn: string
}

export const SWITCH_THEMES: Record<string, SwitchTheme> = {
  light: {
    border: 'border-none',
    bg: 'bg-white',
    fill: 'fill-[gray-light]',
    fillOn: 'fill-[gray-base]',
  },
  dark: {
    border: 'border-white',
    bg: 'bg-white/[0.15]',
    fill: 'fill-white',
    fillOn: 'fill-black',
  },
}