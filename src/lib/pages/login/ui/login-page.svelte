<script lang="ts">
  import { quartInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'
  import { base } from '$app/paths'
  import { LoginForm } from '$lib/features/authenticate'
  import { AnchorButton } from '$lib/shared/ui'

  // FIXME: outを指定するとY=0から始まるため指定しない
  // out:fly={{ x: '100vh', easing: quartIn }}
</script>

<section
  class="grid flex-grow place-items-center"
  in:fly={{ x: '100vh', duration: 800, easing: quartInOut }}
>
  <LoginForm>
    <AnchorButton slot="cancel" to={base} replaceState={true} theme={'transparent'}
      >Cancel</AnchorButton
    >
  </LoginForm>
</section>
