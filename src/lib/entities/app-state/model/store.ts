import { derived, writable } from 'svelte/store'
import { type Setting, type ColorSchemes, COLOR_SCHEMES } from './type'

function createSetting() {
  const { subscribe, update } = writable<Setting>({ theme: null })

  const updateTheme = (scheme: string | null) => {
    if (scheme === COLOR_SCHEMES.dark) {
      window.document.body.classList.add(scheme)
      localStorage.setItem('theme', scheme)
    } else {
      window.document.body.classList.remove(COLOR_SCHEMES.dark)
      localStorage.removeItem('theme')
      scheme = null
    }

    update((items) => ({ ...items, theme: scheme as ColorSchemes }))
  }

  const load = (): string | null => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const scheme = localStorage.getItem('theme') ?? (isDark ? COLOR_SCHEMES.dark : null)
    updateTheme(scheme as ColorSchemes)
    return scheme
  }

  return {
    subscribe,
    updateTheme,
    load,
  }
}

export const setting = createSetting()
export const isDarkMode = derived(setting, ($setting) => $setting.theme === COLOR_SCHEMES.dark)
