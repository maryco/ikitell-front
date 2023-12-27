import { writable } from 'svelte/store'
import type { User } from './type'

export const user = writable<User | null>(null)
