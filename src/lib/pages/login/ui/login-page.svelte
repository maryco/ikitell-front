<script lang="ts">
  import { quartInOut, quartIn } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { LoginForm } from '$lib/features/authenticate'

  // TODO: Y方向にずれる
  // out:fly={{ x: '100vh', easing: quartIn }}
</script>

<section
  class="grid flex-grow place-items-center"
  in:fly={{ x: '100vh', duration: 800, easing: quartInOut }}
>
  <LoginForm>
    <a slot="cancel" href="/">Cancel</a>
  </LoginForm>
</section>
