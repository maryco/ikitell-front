<script lang="ts">
  import { IconClose } from '.'

  export let clear: () => void
  export let size = 20
  export let tabindex = -1
</script>

<i
  on:click={clear}
  on:keyup={(e) => {
    if (e.code?.toLowerCase() === 'enter') clear()
  }}
  {tabindex}
  role="button"
  aria-label="Clear input"
  class={`outline-none transition-colors *:rounded-full *:text-gray-dark/50 *:hover:bg-gray-light 
    *:focus:bg-gray-light *:focus:ring-gray-outline *:dark:text-gray-light 
    *:dark:hover:bg-gray-light/35`}
  ><IconClose {size} />
</i>
