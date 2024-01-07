import type { Action } from 'svelte/action'

export const listenClick: Action<HTMLDivElement, () => void> = (
  node: HTMLDivElement,
  handler: () => void,
) => {
  if (!(node instanceof HTMLDivElement)) {
    return
  }

  node.addEventListener('click', handler)

  return {
    destroy: () => {
      node.removeEventListener('click', handler)
    },
  }
}
