<script lang="ts">
  import { quartInOut, quartIn } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { LoginForm } from '$lib/features/authenticate'
</script>

<section
  class="flex-grow"
  in:fly={{ x: '100vh', duration: 800, easing: quartInOut }}
  out:fly={{ x: '100vh', easing: quartIn }}
>
  <LoginForm />
</section>
