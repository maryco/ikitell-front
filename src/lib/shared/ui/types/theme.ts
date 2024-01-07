export const UI_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const

export type UiSizes = keyof typeof UI_SIZES

export type ButtonTheme = {
  color: { bg: string; focus: string; hover: string; text: string }
  ripple: { bg: string }
}

export const BUTTON_THEMES: Record<string, ButtonTheme> = {
  primary: {
    color: {
      bg: 'bg-primary-0',
      focus: 'focus-within:bg-primary-600/80',
      hover: 'hover:bg-primary-600/80',
      text: '*:text-black *:hover:text-white *:has-[:disabled,[aria-disabled=true]]:text-gray-base',
    },
    ripple: { bg: '!bg-primary-900' },
  },
  secondary: {
    color: {
      bg: 'bg-secondary-0',
      focus: 'focus-within:bg-secondary-300',
      hover: 'hover:bg-secondary-300',
      text: '*:text-black *:hover:text-white *:has-[:disabled,[aria-disabled=true]]:text-gray-base',
    },
    ripple: { bg: '!bg-secondary-700' },
  },
  transparent: {
    color: {
      bg: 'bg-white/10 border border-gray-outline',
      focus: 'focus-within:bg-gray-base/40',
      hover: 'hover:bg-white dark:hover:bg-white',
      text: '*:text-black *:has-[:disabled,[aria-disabled=true]]:text-gray-base *:dark:text-white *:dark:hover:text-black',
    },
    ripple: { bg: '!bg-gray-outline' },
  },
} as const

export type SwitchTheme = {
  border: string
  bg: string
  icon: {
    borderOn: string
    fill: string
    fillOn: string
  }
}

export const SWITCH_THEMES: Record<string, SwitchTheme> = {
  light: {
    border: 'border-gray-outline',
    bg: 'bg-white',
    icon: {
      borderOn: 'border border-gray-dark',
      fill: 'fill-gray-outline',
      fillOn: '!fill-gray-dark',
    },
  },
  dark: {
    border: 'border-outline',
    bg: 'bg-white/[0.15]',
    icon: {
      borderOn: 'border border-white',
      fill: 'fill-gray-outline',
      fillOn: '!fill-white',
    },
  },
}