<script lang="ts">
  import { page } from '$app/stores'
  import { isDarkMode } from '$lib/entities/setting'
  import { AnchorButton } from '$lib/shared/ui'
  import { ThemeSwitch } from '$lib/widgets/theme-switch'

  let isRoot = false
  $: isRoot = $page.url?.pathname === '/'

  const styles = {
    bgBase: 'flex min-h-screen w-screen flex-col bg-gray-surface',
    navBase: 'flex h-20 w-full justify-end gap-x-3 p-5',
    navApp: 'bg-gray-light border border-b-[gray-outline]',
  }
</script>

<main class={styles.bgBase} class:__root={isRoot} class:__dark={isRoot && $isDarkMode}>
  <nav class={`${styles.navBase} ${isRoot ? '' : styles.navApp}`}>
    {#if isRoot}
      <AnchorButton to={'/login'} text={'Log in'} />
    {/if}
    <ThemeSwitch />
  </nav>
  <slot />
</main>

<style lang="postcss">
  :root {
    --grad-hero-light: linear-gradient(
      179deg,
      rgba(101, 134, 247, 0.3) 10%,
      rgba(215, 114, 82, 0.3) 87%
    );
    --grad-hero-dark: linear-gradient(185deg, rgba(23, 39, 95, 0.6) 33%, rgba(116, 28, 1, 0.6) 86%);
  }

  .__root {
    background:
      var(--grad-hero-light),
      theme(backgroundImage.sky-sm) left/cover;
    background-blend-mode: lighten, normal;
  }
  .__dark {
    background:
      var(--grad-hero-dark),
      theme(backgroundImage.sky-sm) left/cover;
    background-blend-mode: darken, normal;
  }

  @media screen('md') {
    .__root {
      background:
        var(--grad-hero-light),
        theme(backgroundImage.sky-lg) left/cover;
    }
    .__dark {
      background:
        var(--grad-hero-dark),
        theme(backgroundImage.sky-lg) left/cover;
      background-blend-mode: darken, normal;
    }
  }
</style>
