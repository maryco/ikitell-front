import { settingStore } from '$lib/entities/setting'
import '../app.css'

export const ssr = false

export function load() {
  const scheme = settingStore.load()
  return {
    theme: scheme,
  }
}
