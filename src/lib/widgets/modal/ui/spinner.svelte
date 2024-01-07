<script lang="ts">
  import { showSpinner } from '../store/store'

  export let label = 'Loading...'
  let dialog: HTMLDialogElement

  $: {
    if (dialog) {
      if ($showSpinner) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }
  }
</script>

<dialog bind:this={dialog} class="place-items-center bg-transparent open:grid">
  <span>{label}</span>
</dialog>
