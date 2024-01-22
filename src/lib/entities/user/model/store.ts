import { derived, writable } from 'svelte/store'
import type { User } from './type'

function createUserStore() {
  const { subscribe, update } = writable<User>({ isAuthenticated: false })

  return {
    subscribe,
    update,
  }
}

export const user = createUserStore()
export const isAuthenticated = derived(user, ($user) => $user?.isAuthenticated)
