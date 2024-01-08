<script>
  import { fade, fly } from 'svelte/transition'
  import { HeroImage } from '$lib/widgets/hero-image'
</script>

<section
  class="mx-auto flex min-h-[600px] w-[90%] max-w-[992px] flex-grow md:w-full md:px-5"
  in:fade={{ delay: 400 }}
>
  <div class="relative w-full md:h-[485px] md:self-center">
    <div
      class="absolute top-[3vh] w-full md:left-0 md:top-auto md:w-[424px]"
      in:fly={{ y: '60vh', delay: 450 }}
    >
      <HeroImage />
    </div>
    <div
      class={`--theme mt-[15vh] flex min-h-[414px] flex-col rounded-xl border pt-[68px] 
      text-center *:text-3xl *:leading-relaxed *:text-white 
      md:absolute md:right-0 md:mt-0 md:size-[485px] md:*:text-4xl md:*:leading-relaxed`}
    >
      <p>Notify Someone<br />Of Your Ghosting.</p>
      <p class="mt-8">For All<br /><strong class="text-[3rem]">"ALONELY"</strong></p>
    </div>
  </div>
</section>

<style lang="postcss">
  .--theme {
    background: var(--grad-sky-light);
    backdrop-filter: blur(8px);
  }
</style>
