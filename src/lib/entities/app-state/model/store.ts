import { derived, writable } from 'svelte/store'
import { type Setting, type ColorSchemes, COLOR_SCHEMES } from './type'

function createSettingStore() {
  const { subscribe, update } = writable<Setting>({ theme: null, inWarning: false })

  const updateTheme = (scheme: string | null) => {
    localStorage.setItem('theme', scheme as ColorSchemes)
    if (scheme === COLOR_SCHEMES.dark) {
      window.document.body.classList.add(scheme)
    } else if (scheme === COLOR_SCHEMES.light) {
      window.document.body.classList.remove(COLOR_SCHEMES.dark)
    } else {
      localStorage.removeItem('theme')
      scheme = null
    }

    update((items) => ({ ...items, theme: scheme as ColorSchemes }))
  }

  const load = (): string | null => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const scheme =
      localStorage.getItem('theme') ?? (isDark ? COLOR_SCHEMES.dark : COLOR_SCHEMES.light)
    updateTheme(scheme as ColorSchemes)
    return scheme
  }

  const updateAppState = (inWarning: boolean) => {
    update((items) => ({ ...items, inWarning: inWarning }))
  }

  return {
    subscribe,
    updateTheme,
    updateAppState,
    load,
  }
}

export const setting = createSettingStore()
export const isDarkMode = derived(setting, ($setting) => $setting.theme === COLOR_SCHEMES.dark)
export const inWarning = derived(setting, ($setting) => $setting.inWarning)
