<script lang="ts">
  import { spinnerStateStore } from '..'
  import {} from '../model/store'
  import IkitellFace from './ikitell-face.svelte'

  export let label = 'loading'

  const color = 'rgb(var(--color-white) / 0.3)'
  const delayOnClose = 300

  let dialog: HTMLDialogElement
  let isOpen: boolean
  $: isOpen = false
  $: {
    if (dialog) {
      if ($spinnerStateStore.visible) {
        isOpen = true
        dialog.showModal()
      } else {
        isOpen = false
        setTimeout(() => {
          // NOTE: Prevent null errors when component is already destroyed.
          if (dialog) dialog.close()
        }, delayOnClose)
      }
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="place-content-center overflow-hidden bg-transparent *:transition-transform *:duration-500 open:grid"
>
  <div class={isOpen ? 'c-spinner scale-1 size-max-content' : 'scale-0'}>
    <div class="size-[200px] select-none" aria-label={label} aria-busy="true">
      <IkitellFace {color} dotColor={color} ariaHidden={true} />
    </div>
  </div>
</dialog>

<style lang="postcss">
  .c-spinner {
    animation: anm-rolling infinite 1.2s ease-in-out;

    :global(svg) {
      width: 100%;
    }
  }

  @keyframes anm-rolling {
    from {
      transform: rotateZ(0deg);
    }

    to {
      transform: rotateZ(360deg);
    }
  }
</style>
