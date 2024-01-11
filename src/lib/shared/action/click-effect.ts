import type { Action } from 'svelte/action'

export const clickEffect: Action<HTMLDivElement, { handler: () => void; hoverStyle: string }> = (
  node,
  props = { handler: () => {}, hoverStyle: '' },
) => {
  if (!(node instanceof HTMLDivElement)) {
    return
  }

  function handleClick() {
    props.handler()
  }

  function addHover() {
    container?.classList.add(...props.hoverStyle.split(' '))
  }

  async function removeHover() {
    await new Promise((resolve) => {
      setTimeout(() => {
        container?.classList.remove(...props.hoverStyle.split(' '))
        resolve
      }, 200)
    })
  }

  const container = node.querySelector('.c-clickable-container')
  if ('ontouchstart' in globalThis) {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis
    container?.addEventListener('touchstart', addHover)
    container?.addEventListener('touchend', removeHover)
  } else {
    // I don't apply effect because of ripple is overflows on iOS.
    node.addEventListener('click', handleClick)
  }

  return {
    destroy: () => {
      if ('ontouchstart' in globalThis) {
        container?.addEventListener('touchstart', addHover)
        container?.removeEventListener('touchend', removeHover)
      } else {
        node.removeEventListener('click', handleClick)
      }
    },
  }
}
