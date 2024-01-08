<script lang="ts">
  import { SWITCH_THEMES, type SwitchTheme } from './types/theme'
  import type { UiSizes } from '.'

  export let name: string
  export let changeHandler: (e: { currentTarget: HTMLInputElement }) => void
  export let isOn = false
  export let onValue = 'on'
  export let offValue = 'off'
  export let size: UiSizes = 'md'
  export let theme: 'dark' | 'light' = 'light'

  const applySize: Record<UiSizes, string> = {
    sm: 'h-8', // 32px
    md: 'h-11', // 44px
    lg: 'h-12', // 48px
  }

  let applyTheme: SwitchTheme
  $: applyTheme = SWITCH_THEMES[theme]

  let onId = `${name}-on`
  let offId = `${name}-off`

  const labelClassBase = 'grid h-full w-full cursor-pointer place-content-center'
  const iconClassBase =
    'grid size-[28px] place-content-center rounded-full transition-shadow *:size-[24px]'
  const makeIconClass = (isActive: boolean) => {
    let classes = [iconClassBase, applyTheme.icon.fill]
    if (isActive) {
      classes.push(applyTheme.icon.fillOn, applyTheme.icon.borderOn)
    }
    return classes.join(' ')
  }
</script>

<fieldset
  class={`flex ${applySize[size]} min-w-[128px] items-center rounded-xl border ${applyTheme.border} ${applyTheme.bg}`}
>
  <!-- On -->
  <div class="grid grow place-items-center border-r-2">
    <input
      {name}
      id={onId}
      role="switch"
      aria-checked={isOn}
      type="radio"
      value={onValue}
      class="appearance-none"
      on:change={changeHandler}
    />
    <label for={onId} class={`c-switch-radio--hover-on ${labelClassBase}`}
      ><span class={`${makeIconClass(isOn)}`}><slot name="iconOn" /></span></label
    >
  </div>
  <!-- Off -->
  <div class="grid grow place-items-center">
    <input
      {name}
      id={offId}
      role="switch"
      aria-checked={!isOn}
      type="radio"
      value={offValue}
      class="appearance-none"
      on:change={changeHandler}
    />
    <label for={offId} class={`c-switch-radio--hover-off ${labelClassBase}`}
      ><span class={`${makeIconClass(!isOn)}`}><slot name="iconOff" /></span></label
    >
  </div>
</fieldset>

<style class="postcss">
  .c-switch-radio {
    &--hover-on:hover > span {
      background: rgb(var(--color-primary) / 0.7);
      box-shadow: 0 0 8px rgb(var(--color-primary) / 0.7);
    }

    &--hover-off:hover > span {
      background: rgb(var(--color-secondary) / 0.7);
      box-shadow: 0 0 8px rgb(var(--color-secondary) / 0.7);
    }
  }
</style>
