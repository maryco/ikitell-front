<script lang="ts">
  import { goto, invalidate } from '$app/navigation'
  import { base } from '$app/paths'
  import { deviceDashboard, type DeviceDashboardSchema } from '$lib/entities/device'
  import { userStore } from '$lib/entities/user'
  import { deviceApi, http } from '$lib/shared/api'
  import { Button } from '$lib/shared/ui'
  import { spinnerStateStore } from '$lib/widgets/spinner-dialog'

  export let theme: 'primary' | 'secondary'
  export let device: DeviceDashboardSchema

  async function clickHandler() {
    spinnerStateStore.show('Sending report.')
    const res = await deviceApi.reports(device.id)
    spinnerStateStore.hide()

    if (res.response.ok) {
      setTimeout(() => {
        device = deviceDashboard.parse(res.data)
        invalidate('feature:report-devices')
      }, 300)
    } else if (http.isWarningError(res.response.status)) {
      alert(Object.values(res.data).join('\n'))
    } else if (http.isAuthError(res.response.status)) {
      userStore.invalidateAuth()
    } else {
      goto(`${base}/error`)
    }
  }
</script>

<Button size={'lg'} {theme} {clickHandler} disabled={!device.enableReset}>{device.resetWord}</Button
>
