<script lang="ts">
  import { BUTTON_THEMES, type ButtonTheme, type UiSizes } from './types/types'

  export let label: string
  export let disabled: boolean
  export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button'
  export let size: UiSizes = 'md'
  export let theme: 'primary' | 'secondary' | 'transparent' | ButtonTheme = 'primary'
  export let clickHandler: () => void | undefined = () => {}

  const applySize: Record<UiSizes, string> = {
    sm: 'h-8 min-h-8', // 32px
    md: 'h-11 min-h-11', // 44px
    lg: 'h-12 min-h-12', // 48px
  }

  const applyTheme: ButtonTheme =
    typeof theme === 'object' ? theme : (BUTTON_THEMES[theme] ??= BUTTON_THEMES['primary'])

  let ripple: HTMLElement
  let buttonElement: HTMLButtonElement
  const rippleEffect = ['!opacity-30', '!scale-[10]', applyTheme.ripple.bg]

  function propagateClick() {
    buttonElement.blur()

    ripple.classList.add(...rippleEffect)
    setTimeout(() => {
      ripple.classList.remove(...rippleEffect)
    }, 300)

    if (clickHandler) clickHandler()
  }
</script>

<div
  class={`c-button-container ${applySize[size]} rounded-2xl
    ${applyTheme.color.bg} text-white shadow-md transition-colors
    ${applyTheme.color.focus} ${applyTheme.color.hover}
    has-[:disabled]:bg-gray-outline has-[:disabled]:shadow-none`}
>
  <span bind:this={ripple} class="--ripple" aria-hidden="true" />
  <button
    bind:this={buttonElement}
    {type}
    class="z-10 cursor-pointer rounded-2xl px-12 outline-none focus:ring-1 disabled:cursor-not-allowed"
    {disabled}
    on:click|stopPropagation={propagateClick}
  >
    {label}
  </button>
</div>

<style lang="postcss">
  .c-button-container {
    display: grid;
    grid-template: 'container';
    place-content: center;
    place-items: center;
    overflow: hidden;

    button {
      grid-area: container;
      width: inherit;
      height: inherit;
    }

    .--ripple {
      grid-area: container;
      height: 100%;
      aspect-ratio: 1 / 1;
      background-color: transparent;
      border-radius: 100%;
      opacity: 0.5;
      transition:
        transform 300ms ease-in-out,
        opacity 300ms ease-in-out;
      transform-origin: center;
    }
  }
</style>
