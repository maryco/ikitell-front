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
      console.log(values)
      return
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

<form use:form class="flex w-[90%] flex-col items-stretch space-y-6 md:w-[520px]">
  <fieldset class="c-fieldset *:text-nowrap">
    <label for="email">e-mail</label>
    <input id="email" name="email" class="rounded-lg px-4 outline-none transition-shadow ease-in" />
    <p class="message overflow-hidden text-ellipsis whitespace-nowrap">
      error. error. error. error. error. error.
    </p>
  </fieldset>

  <fieldset class="c-fieldset *:text-nowrap">
    <label for="password" class="">password</label>
    <input
      id="password"
      type="password"
      name="password"
      class="rounded-lg px-4 outline-none transition-shadow ease-in"
    />
  </fieldset>

  <div>
    <button disabled={!$isValid}>Log in</button>
    <slot name="cancel" />
  </div>
</form>

<style lang="postcss">
  .c-fieldset {
    display: grid;
    grid-template:
      'label message' 36px
      'input input' /
      fit-content(100%) auto;
    grid-auto-rows: 48px;
    gap: 8px 16px;
    width: 100%;

    & input {
      grid-area: input;
      min-height: 48px;
    }

    & label {
      display: grid;
      grid-area: label;
      grid-template-columns: 24px auto;
      place-self: center start;

      &::before {
        justify-self: start;
        width: 24px;
        height: 24px;
        content: '';
        background-color: rgb(var(--color-gray-outline) / 1);
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M16 12L10 18V6L16 12Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E")
          no-repeat center;
      }
    }

    &:focus-within {
      & label::before {
        background-color: rgb(var(--color-primary) / 1);
      }

      & input {
        border: solid 1px rgb(var(--color-gray-outline) / 0.45);
        box-shadow:
          inset 0 0 6px rgb(var(--color-primary-700) / 0.15),
          0 0 6px 2px rgb(var(--color-primary-300) / 0.15);
      }
    }

    & .message {
      grid-area: message;
      place-self: center start;
      max-width: 100%;
    }
  }
</style>
