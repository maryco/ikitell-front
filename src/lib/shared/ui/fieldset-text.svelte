<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { watchEmptyAction } from '../action'
  import { ClearButton, IconProhibited } from '.'

  export let type: 'text' | 'password'
  export let name: string
  export let id = name
  export let label: string | undefined
  export let placeholder = label
  export let errors: string | string[] | undefined
  export let showError = true
  export let readonly = false
  export let disabled = false

  let hasError: boolean
  $: hasError = errors !== undefined && errors.length !== 0

  const dispatch = createEventDispatcher()

  let inputElement: HTMLInputElement
  function clearInput() {
    if (!inputElement) {
      return
    }
    inputElement.focus() // NOTE: It seems that need focus manually to validate on touch devices
    inputElement.classList.add('is-empty')
    dispatch('clear')
  }

  const stateStyles = {
    default: 'bg-white dark:bg-gray-dark',
    disabled: 'bg-gray-outline dark:text-gray-dark',
  }
</script>

<fieldset class="c-fieldset *:text-nowrap">
  {#if label}
    <label for={id} class="dark:text-gray-light">{label}</label>
  {/if}
  <div
    class={`c-fieldset__input-weapper rounded-lg transition-shadow *:h-full ${
      disabled ? stateStyles.disabled : stateStyles.default
    }`}
    class:has-error={hasError}
    class:border-transparent={readonly}
  >
    <input
      bind:this={inputElement}
      use:watchEmptyAction
      {id}
      {type}
      {name}
      class={`peer rounded-lg pl-3 pr-1 outline-none`}
      {placeholder}
      {readonly}
      {disabled}
    />
    {#if readonly}
      <i
        aria-label="It's read only"
        class="c-fieldset__input-icon outline-none *:rounded-full *:text-gray-dark/50 *:dark:text-gray-light"
        ><IconProhibited /></i
      >
    {:else}
      <span class="c-fieldset__input-icon peer-[.is-empty]:!hidden"
        ><ClearButton clear={clearInput} /></span
      >
    {/if}
  </div>
  {#if errors && showError}
    <span class="c-fieldset__error-message overflow-hidden text-ellipsis whitespace-nowrap"
      >{errors}</span
    >
  {/if}
</fieldset>

<style class="postcss">
  /* See app.css */
</style>
