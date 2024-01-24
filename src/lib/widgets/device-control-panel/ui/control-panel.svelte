<script lang="ts">
  import { format } from 'date-fns'
  import { appSettingStore, appStateWarning } from '$lib/entities/app-state'
  import { type DeviceDashboardSchema } from '$lib/entities/device'
  import ReportButton from '$lib/features/report-devices/ui/report-button.svelte'
  import Counter from './counter.svelte'
  import PieGauge from './pie-gauge.svelte'

  export let device: DeviceDashboardSchema

  let deadlineLevel: number
  $: {
    appSettingStore.updateAppState(device.inAlerting || device.remainingTime <= 0)
    deadlineLevel = Math.floor(((device.limitTime - device.remainingTime) / device.limitTime) * 100)
  }
</script>

<div class="flex flex-col flex-nowrap">
  {#key device}
    <div class="c-pie-container group" class:--warning={$appStateWarning}>
      <div class="c-pie-container__gauge">
        <PieGauge
          pieRadius={177}
          {deadlineLevel}
          theme={$appStateWarning ? 'warning' : 'normal'}
          timerExpiresLabel={device.timerExpiresIn
            ? format(device.timerExpiresIn, 'yyyy-MM-dd HH:mm')
            : ''}
        />
      </div>
      <div
        class={`c-pie-container__counter rounded-full bg-gray-bright text-white
        shadow-lg group-[.--warning]:!border-secondary-0`}
      >
        <p
          class={`c-pie-container__counter__label 
          *:border-r-1 bg-black *:h-full *:border-r *:border-white *:text-center
          *:text-[52px] group-[.--warning]:*:border-secondary-0 group-[.--warning]:*:text-secondary-0 *:xs:text-[64px]`}
          aria-label={`reminings ${device.remainingTime} hour`}
        >
          <Counter value={device.remainingTime} />
        </p>
      </div>
    </div>
    <div class="c-control-box px-container-x">
      <ReportButton {device} theme={$appStateWarning ? 'secondary' : 'primary'} />
    </div>
  {/key}
</div>

<style lang="postcss">
  :root {
    --pie-size: min(376px, calc(100vw - 8px));
  }

  .c-pie-container {
    display: grid;
    grid-template: 'container' minmax(0, 1fr) / minmax(0, 1fr);
    place-content: center;
    place-items: center;
    overflow: hidden;

    &__gauge {
      grid-area: container;
      width: var(--pie-size);
    }

    &__counter {
      --counter-width: min(254px, 65vw);

      display: grid;
      grid-area: container;
      place-content: center;
      place-items: center;
      width: var(--counter-width);
      height: var(--counter-width);
      overflow: hidden;
      border: solid 18px rgb(var(--color-white) / 1);

      &__label {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        place-items: stretch;
        width: calc(var(--counter-width) - 34px); /* parent-width - (border-width * 2) - 2px */
        height: 104px;
      }
    }
  }

  .c-control-box {
    width: var(--pie-size);
    margin: 0 auto;
  }

  .--warning {
    .c-pie-container__counter,
    .c-control-box {
      filter: drop-shadow(0 0 7px rgb(var(--color-error) / 1));
    }
  }
</style>
