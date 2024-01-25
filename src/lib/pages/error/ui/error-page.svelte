<script>
  import { base } from '$app/paths'
  import { AnchorButton } from '$lib/shared/ui'
</script>

<section
  class="grid flex-grow place-items-center"
>
  <ul class="flex w-[90%] flex-col items-stretch space-y-6 md:w-[520px]">
    <li class="text-center mb-8">Sorry, some kind of error has occurred: Please try again later.</li>
    <li><AnchorButton to={base} replaceState={true} theme={'transparent'}>Top</AnchorButton></li>
    <li><AnchorButton to={`${base}/login`} replaceState={true} theme={'transparent'}>Login</AnchorButton></li>
  </ul>
</section>
