import { writable } from 'svelte/store'
import type { SpinnerState } from './type'

function createSpinnerStateStore() {
  const { subscribe, update } = writable<SpinnerState>({ visible: false, label: 'loading' })

  const show = (label = 'loading') => {
    update(() => ({ visible: true, label: label }))
  }

  const hide = () => {
    update((state) => ({ ...state, visible: false }))
  }

  return {
    subscribe,
    update,
    show,
    hide,
  }
}

//export const spinner = writable<SpinnerState>({visible: false, label: 'loading'})
export const spinner = createSpinnerStateStore()
