<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { LogoutButton } from '$lib/features/authenticate'
  import { SpinnerDialog } from '$lib/widgets/spinner-dialog'
  import { ThemeSwitch } from '$lib/widgets/theme-switch'

  onMount(() => {
    // @see app.html
    setTimeout(() => {
      const splash = document.querySelector('#splash-content')
      if (splash) splash.remove()
    }, 1000)
  })
</script>

<main class="flex min-h-screen w-screen flex-col">
  {#if !$page.error}
    <nav
      class="flex h-[52px] w-full items-center justify-end gap-x-3
      border-b border-[gray-outline] bg-gray-light px-[10px] dark:border-none dark:bg-gray-base"
    >
      <LogoutButton />
      <ThemeSwitch size={`sm`} iconSize={20} />
    </nav>
  {/if}
  <slot />
</main>
<SpinnerDialog />
