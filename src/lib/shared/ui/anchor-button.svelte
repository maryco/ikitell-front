<script lang="ts">
  export let to: string
  export let text: string
  // TODO: theme, size
</script>

<a
  class="relative grid h-11 place-content-center rounded-xl border border-white bg-white/[0.15] px-12 text-center text-white transition-shadow duration-300"
  href={to}
>
  <span>{text}</span><slot name="icon" />
</a>

<style class="postcss">
  a:hover {
    box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.8);
    background: var(--grad-sky-light);
  }
</style>
