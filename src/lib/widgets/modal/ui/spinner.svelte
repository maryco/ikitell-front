<script lang="ts">
  import { showSpinner } from '../store/store'

  export let label = 'Loading...'
  let dialog: HTMLDialogElement

  $: {
    console.log($showSpinner)
    if (dialog) {
      if ($showSpinner) {
        console.log('Show spinner')
        dialog.showModal()
      } else {
        console.log('Hide spinner')
        dialog.close()
      }
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="backdrop:bg-[gray-dark]/30 place-items-center bg-transparent open:grid"
>
  <span>{label}</span>
</dialog>
