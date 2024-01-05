<script lang="ts">
  import { validator } from '@felte/validator-zod'
  import { createForm } from 'felte'
  import * as zod from 'zod'
  import { goto } from '$app/navigation'
  import { authApi } from '$lib/shared/api'
  import { Button, FieldSetText } from '$lib/shared/ui'
  import { showSpinner } from '$lib/widgets/modal'
  import { loginSchema } from '../model/login-form-schema'

  // TODO
  $: {
    console.log(JSON.stringify($errors, null, 2))
    if ($isValidating) {
      console.log(`isValidating`)
    }
    if ($isValid) {
      console.log(`isValid`)
    } else {
      console.log(`inValid`)
    }
  }

  $: {
    showSpinner.set($isSubmitting)
  }

  const { form, isValid, isValidating, isSubmitting, errors, setFields } = createForm<
    zod.infer<typeof loginSchema>
  >({
    extend: validator({ schema: loginSchema, level: 'error' }),
    onSubmit: async (values) => {
      console.log(values)
      if (!$isValid) {
        return
      }

      // TODO: remove show loading mock
      await new Promise((resolve, _) => {
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
      showSpinner.set(false)
      // return

      const res = await authApi.login(values)
      if (res.response.ok) {
        goto('dashboard')
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
    <Button type="submit" label="Log in" disabled={!$isValid} size="lg" theme="secondary" />
    <slot name="cancel" />
  </div>
</form>
