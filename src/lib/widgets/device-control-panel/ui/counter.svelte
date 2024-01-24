<script lang="ts">
  import { tweened } from 'svelte/motion'

  export let value = 0

  let count = tweened(0, {
    duration: 800,
  })
  $: $count = Math.min(999, Math.abs(value))

  let counterNumbers: number[]
  $: {
    counterNumbers = [
      Math.floor($count / 100),
      Math.floor(($count % 100) / 10),
      Math.floor($count % 10),
    ]
  }

  const baseStyle = 'grid place-items-center'
</script>

<span class={`${baseStyle}`}>{value < 0 ? '-' : ''}</span>
<span class={`${baseStyle}`}>{counterNumbers[0]}</span>
<span class={`${baseStyle}`}>{counterNumbers[1]}</span>
<span class={`${baseStyle}`}>{counterNumbers[2]}</span>
<span class={`mt-[6px] ${baseStyle} !text-[42px]`} aria-label="hour">h</span>
