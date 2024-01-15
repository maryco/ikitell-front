<script lang="ts">
  import { onMount } from 'svelte'
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { isDarkMode } from '$lib/entities/app-state'
  import { AnchorButton } from '$lib/shared/ui'
  import { SpinnerDialog } from '$lib/widgets/spinner-dialog'
  import { ThemeSwitch } from '$lib/widgets/theme-switch'

  let isRoot = false
  let showHeaderNav = true
  $: isRoot = $page.url?.pathname === `${base}/`
  $: showHeaderNav = !$page.route?.id?.endsWith('login')

  const styles = {
    bgBase: 'flex min-h-screen w-screen flex-col',
    navBase: 'flex h-20 w-full items-center justify-end gap-x-3 p-5',
    navApp: 'bg-gray-light border-b border-b-gray-outline dark:bg-gray-base',
  }

  onMount(() => {
    // @see app.html
    if (isRoot) {
      // NOTE: Remove "splash-content" by script within app.html
      return
    }
    setTimeout(() => {
      const splash = document.querySelector('#splash-content')
      if (splash) splash.remove()
    }, 1000)
  })
</script>

<main class={styles.bgBase} class:--root={isRoot} class:--dark={isRoot && $isDarkMode}>
  {#if showHeaderNav}
    <nav class={`${styles.navBase} ${isRoot ? '' : styles.navApp}`}>
      {#if isRoot}
        <AnchorButton to={'login'} theme={'transparent'} modifireClass={'--top'} noShadow={true}
          >Log in</AnchorButton
        >
      {/if}
      <ThemeSwitch theme={`dark`} />
    </nav>
  {/if}
  <slot />
</main>
<SpinnerDialog />

<style lang="postcss">
  :root {
    --grad-hero-light: linear-gradient(
      179deg,
      rgba(101 134 247 / 0.3) 10%,
      rgba(215 114 82 / 0.3) 87%
    );
    --grad-hero-dark: linear-gradient(185deg, rgba(23 39 95 / 0.6) 33%, rgba(116 28 1 / 0.6) 86%);
  }

  .--root {
    background:
      var(--grad-hero-light),
      theme(backgroundImage.sky-sm) left/cover;
    background-blend-mode: lighten, normal;

    @media screen('md') {
      background:
        var(--grad-hero-light),
        theme(backgroundImage.sky-lg) left/cover;
    }
  }

  .--dark {
    background:
      var(--grad-hero-dark),
      theme(backgroundImage.sky-sm) left/cover;
    background-blend-mode: darken, normal;

    @media screen('md') {
      background:
        var(--grad-hero-dark),
        theme(backgroundImage.sky-lg) left/cover;
    }
  }
</style>
