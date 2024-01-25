<script lang="ts">
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import { userStore } from '$lib/entities/user'
  import { authApi, http } from '$lib/shared/api'
  import { Button } from '$lib/shared/ui'
  import { spinnerStateStore } from '$lib/widgets/spinner-dialog'

  export let to = `${base}`

  async function logout() {
    spinnerStateStore.show()
    const res = await authApi.logout()
    spinnerStateStore.hide()

    if (res.response.ok) {
      goto(to)
    } else if (http.isAuthError(res.response.status)) {
      userStore.invalidateAuth()
    } else {
      goto(`${base}/error`)
    }
  }
</script>

<Button size={'sm'} theme={'transparent'} clickHandler={logout}>Log out</Button>
