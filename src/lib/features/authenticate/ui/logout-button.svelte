<script lang="ts">
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import { authApi } from '$lib/shared/api'
  import { Button } from '$lib/shared/ui'
  import { spinnerStateStore } from '$lib/widgets/spinner-dialog'

  export let to = `${base}`

  async function logout() {
    spinnerStateStore.show()
    const res = await authApi.logout()
    spinnerStateStore.hide()

    if (res?.response.ok) {
      goto(to)
    } else {
      // TODO: Handle Error
      alert('Fails to logout')
    }
  }
</script>

<Button size={'sm'} theme={'transparent'} clickHandler={logout}>Log out</Button>
