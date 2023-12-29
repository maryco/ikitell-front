<script lang="ts">
  import { settingStore, isDarkMode, COLOR_SCHEMES } from '$lib/entities/setting'
  import { IconMoon, IconSun, SwitchRadio } from '$lib/shared/ui'

  function changeToDarkMode(e: { currentTarget: HTMLInputElement }) {
    settingStore.updateTheme(e.currentTarget.value)
  }
</script>

<SwitchRadio
  name="darkMode"
  changeHandler={changeToDarkMode}
  onValue={COLOR_SCHEMES.dark}
  isOn={$isDarkMode}
>
  <IconMoon slot="iconOn" />
  <IconSun slot="iconOff" />
</SwitchRadio>
