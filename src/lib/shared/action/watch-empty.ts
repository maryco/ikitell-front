import type { Action } from 'svelte/action'

export const watchEmpty: Action<HTMLInputElement> = (node: HTMLInputElement) => {
  if (!(node instanceof HTMLInputElement)) {
    return
  }

  function toggleEmptyState() {
    if (node.value.length > 0) {
      node.classList.remove('is-empty')
    } else {
      node.classList.add('is-empty')
    }
  }
  node.addEventListener('input', toggleEmptyState)
  toggleEmptyState()

  return {
    destroy: () => {
      node.removeEventListener('input', toggleEmptyState)
    },
  }
}
