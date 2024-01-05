<script lang="ts">
  import { isDarkMode } from '$lib/entities/app-state'
  import type { UiSizes } from '.'

  export let to: string
  export let text: string
  export let size: UiSizes = 'md'
  // TODO: theme

  const applySize: Record<UiSizes, string> = {
    sm: 'h-8', // 32px
    md: 'h-11', // 44px
    lg: 'h-12', // 48px
  }

  const applyTheme = {
    
  }

</script>

<a
  class={`grid ${applySize[size]} place-content-center rounded-xl
    border border-white bg-white/15
    px-12 text-center text-white transition-shadow duration-300`}
  href={to}
>
  <span>{text}</span>
</a>

<style class="postcss">
  a:hover {
    background: var(--grad-sky-light);
    box-shadow: 0 0 12px rgb(255 255 255 / 0.8);
  }
</style>
