<script lang="ts">
  import { validator } from '@felte/validator-zod'
  import { createForm } from 'felte'
  import * as zod from 'zod'
  import { FieldSetText } from '$lib/shared/ui'
  import AnchorButton from '$lib/shared/ui/anchor-button.svelte'
  import FormButton from '$lib/shared/ui/form-button.svelte'
  import { showSpinner } from '$lib/widgets/modal'

  /**
   * Form: https://felte.dev/docs/svelte/getting-started
   */

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

  const formSchema = zod.object({
    email: zod.string().email().min(1),
    password: zod.string().min(1),
    readonlyText: zod.string().nullish(),
    disabledText: zod.string().nullish(),
  })

  const { form, touched, isDirty, isValid, isValidating, isSubmitting, errors, setFields } =
    createForm<zod.infer<typeof formSchema>>({
      extend: validator({ schema: formSchema, level: 'error' }),
      onSubmit: async (values) => {
        console.log(values)
        if (!$isValid) {
          return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        await new Promise((resolve, _) => {
          setTimeout(() => {
            resolve(true)
          }, 3000)
        })
        showSpinner.set(false)
        return
      },
      initialValues: {
        email: 'email@example.com',
        password: 'secret',
        readonlyText: 'This is read only',
        disabledText: 'THIS FIELD IS DISABLED!',
      },
    })

  let isTouched: boolean
  $: isTouched = $isDirty || $touched.email || $touched.password

  const sectionBase = 'grid flex-grow place-items-center bg-gray-surface dark:bg-gray-surface-dark'
</script>

<svelte:head>
  <title>UI Demo | ikitell</title>
</svelte:head>

<!-- Colors -->
<section class={sectionBase}>
  <div class="flex gap-4">
    <ul class="grid grid-cols-3 place-content-start *:size-11">
      <li class="bg-primary-0" title="primary-0"></li>
      <li class="bg-primary-600" title="primary-600"></li>
      <li class="bg-primary-900" title="primary-900"></li>
      <li class="bg-secondary-0" title="secondary-0"></li>
      <li class="bg-secondary-300" title="secondary-300"></li>
      <li class="bg-secondary-700" title="secondary-700"></li>
    </ul>
    <ul class="grid grid-cols-3 place-content-start *:size-11">
      <li class="bg-white" title="white"></li>
      <li class="bg-black" title="black"></li>
      <li class="bg-error" title="error"></li>
    </ul>
    <ul class="grid grid-cols-6 place-content-start *:size-11">
      <li class="bg-gray-surface" title="gray-surface"></li>
      <li class="bg-gray-light" title="gray-light"></li>
      <li class="bg-gray-base" title="gray-base"></li>
      <li class="bg-gray-dark" title="gray-dark"></li>
      <li class="bg-gray-outline" title="gray-outline"></li>
      <li class="bg-gray-surface-dark" title="gray-surface-dark"></li>
    </ul>
  </div>
</section>

<section class={sectionBase}>
  <ul class="grid grid-cols-3 place-content-center gap-4">
    <li><AnchorButton to={'#'} text={'Link Primary'} theme={'primary'} /></li>
    <li><AnchorButton to={'#'} text={'Link Secondary'} theme={'secondary'} /></li>
    <li><AnchorButton to={'#'} text={'Link Transparent'} theme={'transparent'} /></li>

    <li><AnchorButton to={'#'} text={'Link Flat'} theme={'primary'} noShadow={true} /></li>
    <li><AnchorButton to={'#'} text={'Link Flat'} theme={'secondary'} noShadow={true} /></li>
    <li><AnchorButton to={'#'} text={'Link Flat'} theme={'transparent'} noShadow={true} /></li>

    <li><AnchorButton to={'#'} text={'Link Larg'} theme={'primary'} size={'lg'} /></li>
    <li><AnchorButton to={'#'} text={'Link Medium'} theme={'secondary'} size={'md'} /></li>
    <li><AnchorButton to={'#'} text={'Link Small'} theme={'transparent'} size={'sm'} /></li>
  </ul>
</section>

<!-- Form Controls -->
<section class={sectionBase}>
  <div class="flex w-[90%] flex-col items-stretch space-y-6 md:w-[520px]">
    <form use:form class="flex w-full flex-col items-stretch gap-6">
      <div class="grid grid-cols-2 gap-4">
        <FieldSetText
          type="text"
          name="email"
          label="e-mail"
          errors={$errors.email ?? []}
          showError={true}
          on:clear={() => setFields('email', '', true)}
        />
        <!-- Without error state -->
        <FieldSetText
          type="password"
          name="password"
          label="password"
          errors={[]}
          showError={false}
          on:clear={() => setFields('password', '', true)}
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <FieldSetText
          type="text"
          name="readonlyText"
          label="readonly text"
          placeholder=""
          errors={[]}
          showError={true}
          readonly={true}
          on:clear={() => {}}
        />
        <FieldSetText
          type="text"
          name="disabledText"
          label="disabled text"
          placeholder=""
          errors={[]}
          showError={true}
          disabled={true}
          on:clear={() => {}}
        />
      </div>
      <div class="flex flex-col items-center space-y-4 pt-4 *:w-[280px]">
        <FormButton type="submit" label="Log in" disabled={!$isValid} size="lg" theme="secondary" />
        <FormButton
          type="reset"
          label="Reset Is Dirty"
          disabled={!isTouched}
          size="lg"
          theme="secondary"
        />
        <FormButton type="reset" label="Reset Always" size="lg" theme="primary" />
      </div>
    </form>
  </div>
</section>
