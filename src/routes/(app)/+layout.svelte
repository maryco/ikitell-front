<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { appStateWarning } from '$lib/entities/app-state'
  import { isAuthenticated } from '$lib/entities/user'
  import { LogoutButton } from '$lib/features/authenticate'
  import { ErrorPage } from '$lib/pages/error'
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

<main class="flex min-h-screen w-screen flex-col" class:bg-warning={$appStateWarning}>
  {#if !$page.error}
    <nav
      class={`flex h-[52px] w-full items-center justify-end gap-x-3 
        border-gray-outline px-container-x dark:border-none 
        ${$appStateWarning ? 'bg-gray-dark/60' : 'border-b bg-gray-light dark:bg-gray-base'}`}
    >
      <LogoutButton />
      <ThemeSwitch size={`sm`} iconSize={20} />
    </nav>
  {/if}
  {#if $isAuthenticated}
    <slot />
  {:else}
    <ErrorPage />
  {/if}
</main>
<SpinnerDialog />
