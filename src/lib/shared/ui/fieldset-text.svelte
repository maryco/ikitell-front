<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { watchEmptyAction } from '../action'
  import { ClearButton } from '.'

  export let type: 'text' | 'password'
  export let name: string
  export let id = name
  export let label: string | undefined
  export let placeholder = label
  export let errors: string | string[] | undefined
  export let showError = true

  const dispatch = createEventDispatcher()

  let inputElement: HTMLInputElement
  function clearInput() {
    if (!inputElement) {
      return
    }
    inputElement.classList.add('is-empty')
    dispatch('clear')
  }
</script>

<fieldset class="c-fieldset *:text-nowrap">
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <div class="c-fieldset__input-weapper *:h-full">
    <input
      bind:this={inputElement}
      use:watchEmptyAction
      {id}
      {type}
      {name}
      class="peer w-full rounded-lg border border-gray-outline pl-4 pr-10 outline-none transition-shadow"
      {placeholder}
    />
    <ClearButton clear={clearInput} />
  </div>
  {#if errors && showError}
    <p class="message overflow-hidden text-ellipsis whitespace-nowrap">{errors}</p>
  {/if}
</fieldset>

<style class="postcss">
  .c-fieldset {
    display: grid;
    grid-template:
      'label message' 36px
      'input input' /
      fit-content(100%) auto;
    grid-auto-rows: 48px;
    gap: 8px 16px;
    width: 100%;

    &__input-weapper {
      position: relative;
      grid-area: input;
      min-height: 48px;
    }

    & label {
      display: grid;
      grid-area: label;
      grid-template-columns: 24px auto;
      place-self: center start;

      &::before {
        justify-self: start;
        width: 24px;
        height: 24px;
        content: '';
        background-color: rgb(var(--color-gray-outline) / 1);
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16 12L10 18V6L16 12Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E")
          no-repeat center;
      }
    }

    &:focus-within {
      & label::before {
        background-color: rgb(var(--color-primary) / 1);
      }

      & input {
        border: solid 1px rgb(var(--color-gray-outline) / 0.45);
        box-shadow:
          inset 0 0 6px rgb(var(--color-primary-700) / 0.15),
          0 0 6px 2px rgb(var(--color-primary-300) / 0.15);
      }
    }

    & .message {
      grid-area: message;
      place-self: center start;
      max-width: 100%;
    }

    &:has(input[aria-invalid='true']) {
      & .message,
      label,
      & ::placeholder {
        color: rgb(var(--color-error) / 1);
      }

      & label::before {
        background-color: rgb(var(--color-error) / 1);
      }

      & input {
        box-shadow:
          inset 0 0 6px rgb(var(--color-error) / 0.15),
          0 0 6px 2px rgb(var(--color-error) / 0.6);
      }
    }
  }
</style>
