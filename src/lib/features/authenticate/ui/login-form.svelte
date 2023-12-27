<script lang="ts">
  import { validator } from '@felte/validator-zod'
  import { createForm } from 'felte'
  import { goto } from '$app/navigation'
  import { authApi } from '$lib/shared/api'
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

  const { form, isValid, isValidating, errors } = createForm({
    extend: validator({ schema: loginSchema, level: 'error' }),
    onSubmit: async (values) => {
      if (!$isValid) {
        return
      }
      const res = await authApi.login(values)
      if (res.response.ok) {
        goto('dashboard')
      }
    },
  })
</script>

<form use:form>
  <input name="email" />
  <input name="password" />
  <button disabled={!$isValid}>Log in</button>
</form>
