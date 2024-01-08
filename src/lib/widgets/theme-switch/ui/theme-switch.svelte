<script lang="ts">
  import { appSettingStore, isDarkMode, COLOR_SCHEMES } from '$lib/entities/app-state'
  import { IconMoon, IconSun, SwitchRadio } from '$lib/shared/ui'

  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let iconSize = 24
  export let theme: 'dark' | 'light' | null = null

  function changeToDarkMode(e: { currentTarget: HTMLInputElement }) {
    appSettingStore.updateTheme(e.currentTarget.value)
  }
</script>

<SwitchRadio
  name="darkMode"
  changeHandler={changeToDarkMode}
  onValue={COLOR_SCHEMES.dark}
  offValue={COLOR_SCHEMES.light}
  isOn={$isDarkMode}
  theme={theme ?? ($isDarkMode ? 'dark' : 'light')}
  {size}
>
  <IconMoon slot="iconOn" size={iconSize} />
  <IconSun slot="iconOff" size={iconSize} />
</SwitchRadio>
