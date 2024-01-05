<script lang="ts">
  import { IconClose } from '.'

  export let clear: () => void
  export let size = 20
  export let tabindex = 0
</script>

<i
  on:click={clear}
  on:keyup={(e) => {
    if (e.code?.toLowerCase() === 'enter') clear()
  }}
  {tabindex}
  role="button"
  aria-label="Clear input"
  class={`absolute right-0 top-0 flex items-center pr-2 outline-none 
    transition-colors *:rounded-full *:text-gray-dark/50 *:hover:bg-gray-light 
    *:focus:bg-gray-light *:focus:ring-gray-outline peer-[.is-empty]:!hidden`}
  ><IconClose {size} />
</i>

<style lang="postcss">
</style>
