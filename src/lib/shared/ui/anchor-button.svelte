<script lang="ts">
  import { BUTTON_SIZES } from './types/theme'
  import { ClickableContainer } from '.'
  import type { ButtonTheme, UiSizes } from '.'

  export let to: string
  export let replaceState = false
  export let disabled = false
  export let size: UiSizes = 'md'
  export let theme: 'primary' | 'secondary' | 'transparent' | ButtonTheme = 'primary'
  export let noShadow = false
  export let modifireClass: string = ''

  const applySize = BUTTON_SIZES[size]
</script>

<ClickableContainer {size} {theme} {noShadow} {modifireClass}>
  <a
    class={`__clickable z-10 grid ${applySize} cursor-pointer place-items-center rounded-2xl px-button-x 
    text-center font-medium leading-none
    focus-visible:outline-none aria-disabled:cursor-not-allowed`}
    href={!disabled ? to : '#'}
    data-sveltekit-replacestate={replaceState}
    aria-disabled={disabled}
  >
    <span class={`${modifireClass}`}><slot /></span>
  </a>
</ClickableContainer>

<style lang="postcss">
  .--top {
    color: rgb(var(--color-white) / 1);
  }
</style>
