<script lang="ts">
  export let name: string
  export let changeHandler: (e: { currentTarget: HTMLInputElement }) => void
  export let isOn = false
  export let onValue = 'on'
  export let offValue = 'off'

  let onId = `${name}-on`
  let offId = `${name}-off`
</script>

<fieldset
  class="flex h-11 min-w-[128px] items-center rounded-xl border border-white bg-white/[0.15]"
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
        class:!fill-black={!isOn}
        class="grid size-[28px] place-content-center rounded-full border-white fill-white transition-shadow *:size-[24px]"
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
        class:!fill-black={isOn}
        class="grid size-[28px] place-content-center rounded-full border-white fill-white transition-shadow *:size-[24px]"
        ><slot name="iconOff" /></span
      ></label
    >
  </div>
</fieldset>

<style class="postcss">
  .__hover_on:hover > span {
    box-shadow: 0px 0px 8px rgb(var(--color-primary) / 0.7);
    background: rgb(var(--color-primary) / 0.7);
  }
  .__hover_off:hover > span {
    box-shadow: 0px 0px 8px rgb(var(--color-secondary) / 0.7);
    background: rgb(var(--color-secondary) / 0.7);
  }
</style>
