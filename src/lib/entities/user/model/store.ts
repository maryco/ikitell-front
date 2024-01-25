import { derived, writable } from 'svelte/store'
import type { User } from './type'

function createUserStore() {
  const { subscribe, update } = writable<User>({ isAuthenticated: false })

  const invalidateAuth = () => {
    update((user) => ({ ...user, isAuthenticated: false }))
  }

  return {
    subscribe,
    update,
    invalidateAuth,
  }
}

export const user = createUserStore()
export const isAuthenticated = derived(user, ($user) => $user?.isAuthenticated)
