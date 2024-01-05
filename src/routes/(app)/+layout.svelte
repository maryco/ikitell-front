<script>
  import { isDarkMode } from '$lib/entities/app-state'
  import { AnchorButton } from '$lib/shared/ui'
  import { SpinnerDialog } from '$lib/widgets/modal'
  import { ThemeSwitch } from '$lib/widgets/theme-switch'
</script>

<main class="flex min-h-screen w-screen flex-col bg-gray-surface dark:bg-gray-dark">
  <nav
    class="flex h-[52px] w-full items-center justify-end gap-x-3 
    border-b border-[gray-outline] bg-gray-light px-[10px] dark:bg-gray-mid dark:border-none"
  >
    <AnchorButton to={'/logout'} text={'Log out'} size={'sm'} />
    <ThemeSwitch size={`sm`} iconSize={20} />
  </nav>
  <slot />
</main>
<SpinnerDialog />

<style lang="postcss">
</style>
