<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { deviceDashboard, type DeviceDashboardSchema } from '$lib/entities/device'
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
    } else {
      // TODO: Handle Error
      alert('Fails to sending report')
    }
  }
</script>

<Button size={'lg'} {theme} {clickHandler} disabled={!device.enableReset}>{device.resetWord}</Button
>
