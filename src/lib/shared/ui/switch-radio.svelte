<script lang="ts">
  import { SWITCH_THEMES, type SwitchTheme } from './types/types'
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
</script>

<fieldset
  class={`flex ${applySize[size]} min-w-[128px] items-center rounded-xl border ${applyTheme.border} ${applyTheme.bg}`}
>
  <div class="relative grid grow place-items-center border-r-2">
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
    <label for={onId} class="__hover_on grid h-full w-full cursor-pointer place-content-center"
      ><span
        class:border={isOn}
        class={`grid size-[28px] place-content-center rounded-full 
        ${applyTheme.border} ${applyTheme.fill} transition-shadow *:size-[24px]
        ${!isOn ? '!' + applyTheme.fillOn : ''}`}
        ><slot name="iconOn" /></span
      ></label
    >
  </div>
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
    <label for={offId} class="__hover_off grid h-full w-full cursor-pointer place-content-center"
      ><span
        class:border={!isOn}
        class={`grid size-[28px] place-content-center rounded-full 
        ${applyTheme.border} ${applyTheme.fill} transition-shadow *:size-[24px] 
        ${isOn ? '!' + applyTheme.fillOn : ''}`}
        ><slot name="iconOff" /></span
      ></label
    >
  </div>
</fieldset>

<style class="postcss">
  .__hover_on:hover > span {
    background: rgb(var(--color-primary) / 0.7);
    box-shadow: 0 0 8px rgb(var(--color-primary) / 0.7);
  }

  .__hover_off:hover > span {
    background: rgb(var(--color-secondary) / 0.7);
    box-shadow: 0 0 8px rgb(var(--color-secondary) / 0.7);
  }
</style>
