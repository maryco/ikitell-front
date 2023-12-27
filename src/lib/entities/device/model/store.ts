import { writable } from 'svelte/store'
import type { Device } from './type'

export const user = writable<Device[] | []>([])
