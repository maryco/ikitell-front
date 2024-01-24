<script lang="ts">
  import { page } from '$app/stores'
  import { DeviceControlPanel } from '$lib/widgets/device-control-panel'
</script>

<section class="grid flex-grow place-content-center">
  {#each $page.data.devices as device}
    <DeviceControlPanel {device} />
  {/each}
</section>
