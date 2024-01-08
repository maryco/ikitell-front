<script lang="ts">
  import { listenClickAction } from '../action'
  import { BUTTON_SIZES, BUTTON_THEMES, type ButtonTheme, type UiSizes } from './types/theme'

  /**
   * NOTE: Slots element required apply class '__clickable'
   */

  export let size: UiSizes = 'md'
  export let theme: 'primary' | 'secondary' | 'transparent' | ButtonTheme = 'primary'
  export let modifireClass: string = ''
  export let noShadow = false
  export let disabled = false

  const applySize = BUTTON_SIZES[size]

  const applyTheme: ButtonTheme =
    typeof theme === 'object' ? theme : (BUTTON_THEMES[theme] ??= BUTTON_THEMES['primary'])

  let ripple: HTMLElement
  const rippleEffect = ['!opacity-30', '!scale-[10]', applyTheme.ripple.bg]

  function genelateRipple() {
    if (disabled) {
      return
    }

    ripple.classList.add(...rippleEffect)
    setTimeout(() => {
      // NOTE: Prevent null errors when component is already destroyed.
      if (ripple) ripple.classList.remove(...rippleEffect)
    }, 200)
  }
</script>

<div
  class={`c-clickable-container ${applySize} rounded-xl
    ${applyTheme.color.bg} text-white shadow-md transition-colors duration-200 ease-out *:duration-200 dark:shadow-gray-dark
    ${applyTheme.color.focus} ${applyTheme.color.hover} ${applyTheme.color.text}
    has-[:disabled,[aria-disabled=true]]:bg-gray-outline has-[:disabled,[aria-disabled=true]]:shadow-none 
    ${modifireClass}`}
  class:--flat={noShadow}
  use:listenClickAction={genelateRipple}
>
  <span bind:this={ripple} class="__ripple" aria-hidden="true" />
  <slot />
</div>

<style lang="postcss">
  .c-clickable-container {
    display: grid;
    grid-template: 'container';
    place-content: center;
    place-items: center;
    overflow: hidden;

    :global(.__clickable) {
      grid-area: container;
      width: inherit;
      height: inherit;
    }

    .__ripple {
      grid-area: container;
      height: 100%;
      aspect-ratio: 1 / 1;
      background-color: transparent;
      border-radius: 100%;
      opacity: 0.5;
      transition:
        transform 200ms ease-in,
        opacity 200ms ease-in;
      transform-origin: center;
    }
  }

  .--flat {
    box-shadow: none !important;
  }

  .--top {
    &:hover,
    &:focus,
    &:focus-within {
      background: var(--grad-sky-light) !important;
      box-shadow: 0 0 12px rgb(255 255 255 / 0.8) !important;
    }
  }
</style>
