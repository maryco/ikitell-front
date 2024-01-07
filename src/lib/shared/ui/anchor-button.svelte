<script lang="ts">
  import ClickableContainer from './clickable-container.svelte'
  import type { ButtonTheme, UiSizes } from '.'

  export let to: string
  export let text: string
  export let replaceState = false
  export let disabled = false
  export let size: UiSizes = 'md'
  export let theme: 'primary' | 'secondary' | 'transparent' | ButtonTheme = 'primary'
  export let noShadow = false
  export let modifireClass: string = ''
</script>

<ClickableContainer {size} {theme} {noShadow} {modifireClass}>
  <a
    class={`__clickable z-10 grid cursor-pointer place-items-center rounded-2xl px-button-x text-center font-medium leading-none
    focus-visible:outline-none aria-disabled:cursor-not-allowed`}
    href={!disabled ? to : '#'}
    data-sveltekit-replacestate={replaceState}
    aria-disabled={disabled}
  >
    <span class={`${modifireClass}`}>{text}</span>
  </a>
</ClickableContainer>

<style lang="postcss">
  .--top {
    color: rgb(var(--color-white) / 1);
  }
</style>
