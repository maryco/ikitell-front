import { appSettingStore } from '$lib/entities/app-state'
import '@/app.css'

export const ssr = false

export function load() {
  const scheme = appSettingStore.load()
  return {
    theme: scheme,
  }
}
