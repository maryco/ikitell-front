<script lang="ts">
  import { validator } from '@felte/validator-zod'
  import { createForm } from 'felte'
  import * as zod from 'zod'
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import { userStore } from '$lib/entities/user'
  import { authApi, http } from '$lib/shared/api'
  import { FieldSetText, Button } from '$lib/shared/ui'
  import { spinnerStateStore } from '$lib/widgets/spinner-dialog'
  import { loginSchema } from '../model/login-form-schema'

  $: {
    $isSubmitting ? spinnerStateStore.show() : spinnerStateStore.hide()
  }

  const { form, isValid, isSubmitting, errors, setFields } = createForm<
    zod.infer<typeof loginSchema>
  >({
    extend: validator({ schema: loginSchema, level: 'error' }),
    onSubmit: async (values) => {
      if (!$isValid) {
        return
      }

      const res = await authApi.login(values)
      spinnerStateStore.hide()

      if (res.response.ok) {
        userStore.update((user) => ({ ...user, isAuthenticated: true }))
        goto(`${base}/dashboard`, { replaceState: true })
      } else if (http.isWarningError(res.response.status) && res.data) {
        alert(Object.values(res.data).join('\n'))
      } else if (http.isAuthError(res.response.status)) {
        alert('Fails to login')
      } else {
        goto(`${base}/error`, { replaceState: true })
      }
    },
  })
</script>

<form use:form class="flex w-[90%] flex-col items-stretch space-y-6 md:w-[520px]">
  <FieldSetText
    type="text"
    name="email"
    label="e-mail"
    errors={$errors.email ?? []}
    showError={false}
    on:clear={() => setFields('email', '', true)}
  />
  <FieldSetText
    type="password"
    name="password"
    label="password"
    errors={$errors.password ?? []}
    showError={false}
    on:clear={() => setFields('password', '', true)}
  />
  <div class="flex flex-col items-center space-y-6 pt-16 *:w-[280px]">
    <Button type="submit" disabled={!$isValid} size={'lg'} theme={'primary'} clickHandler={() => {}}
      >Log in</Button
    >
    <slot name="cancel" />
  </div>
</form>
