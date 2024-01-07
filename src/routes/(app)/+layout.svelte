<script>
  import { AnchorButton } from '$lib/shared/ui'
  import { SpinnerDialog } from '$lib/widgets/modal'
  import { ThemeSwitch } from '$lib/widgets/theme-switch'
</script>

<main class="flex min-h-screen w-screen flex-col">
  <nav
    class="flex h-[52px] w-full items-center justify-end gap-x-3
    border-b border-[gray-outline] bg-gray-light px-[10px] dark:border-none dark:bg-gray-base"
  >
    <AnchorButton
      to={'/logout'}
      text={'Log out'}
      size={'sm'}
      theme={'transparent'}
      noShadow={true}
    />
    <ThemeSwitch size={`sm`} iconSize={20} />
  </nav>
  <slot />
</main>
<SpinnerDialog />
