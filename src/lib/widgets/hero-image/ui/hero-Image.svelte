<script lang="ts">
  import { onMount } from 'svelte'
  import { assets } from '$app/paths'

  let heroImage: HTMLImageElement
  onMount(() => {
    heroImage.classList.remove('hidden')
  })
</script>

<img
  bind:this={heroImage}
  src={`${assets}/images/heroImage.svg`}
  alt="hero"
  loading="lazy"
  class="hidden"
/>
