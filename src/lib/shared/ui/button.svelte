<script lang="ts">
  import { BUTTON_SIZES_INNER, type ButtonTheme, type UiSizes } from './types/theme'
  import { ClickableContainer } from '.'

  export let disabled = false
  export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button'
  export let size: UiSizes = 'md'
  export let theme: 'primary' | 'secondary' | 'transparent' | ButtonTheme = 'primary'
  export let clickHandler: () => void

  const applySizeInner = BUTTON_SIZES_INNER[size]

  let buttonElement: HTMLButtonElement

  function clickHandlerWrapper() {
    buttonElement.blur()
    clickHandler()
  }
</script>

<ClickableContainer {size} {theme} {disabled}>
  <button
    bind:this={buttonElement}
    {type}
    class={`__clickable z-10 cursor-pointer ${applySizeInner} rounded-2xl px-button-x font-medium
      outline-none focus:ring-1 disabled:cursor-not-allowed`}
    {disabled}
    on:click={clickHandlerWrapper}
  >
    <slot />
  </button>
</ClickableContainer>
