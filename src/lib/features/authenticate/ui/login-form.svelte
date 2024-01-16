<script lang="ts">
  import { validator } from '@felte/validator-zod'
  import { createForm } from 'felte'
  import * as zod from 'zod'
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import { authApi } from '$lib/shared/api'
  import { FieldSetText, Button } from '$lib/shared/ui'
  import { showSpinner } from '$lib/widgets/spinner-dialog'
  import { loginSchema } from '../model/login-form-schema'

  $: {
    showSpinner.set($isSubmitting)
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
      showSpinner.set(false)

      if (res?.response.ok) {
        goto(`${base}/dashboard`, { replaceState: true })
      } else {
        // TODO: Handle Error
        alert('Fails to login')
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
