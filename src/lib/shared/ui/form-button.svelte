<script lang="ts">
  import ClickableContainer from './clickable-container.svelte'
  import { type ButtonTheme, type UiSizes } from './types/theme'

  export let label: string
  export let disabled = false
  export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button'
  export let size: UiSizes = 'md'
  export let theme: 'primary' | 'secondary' | 'transparent' | ButtonTheme = 'primary'
  export let clickHandler: () => void | undefined = () => {}

  let buttonElement: HTMLButtonElement

  function clickHandlerWrapper() {
    buttonElement.blur()
    if (clickHandler) clickHandler()
  }
</script>

<ClickableContainer {size} {theme} {disabled}>
  <button
    bind:this={buttonElement}
    {type}
    class={`__clickable z-10 cursor-pointer rounded-2xl px-button-x font-medium outline-none focus:ring-1
      disabled:cursor-not-allowed`}
    {disabled}
    on:click={clickHandlerWrapper}
  >
    {label}
  </button>
</ClickableContainer>
