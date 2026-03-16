<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="relative overflow-hidden">
    <!-- CTA band -->
    <div class="relative py-20 md:py-28">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/6 rounded-full blur-[160px]" />
        <div class="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-accent-2/5 rounded-full blur-[120px]" />
      </div>

      <div class="relative mx-auto max-w-5xl px-6 text-center">
        <h2 class="text-2xl md:text-4xl font-bold tracking-tight mb-6 gradient-text">
          {{ t('footer.ctaTitle') }}
        </h2>
        <a
          :href="`${localePath('/')}#contact`"
          class="inline-flex items-center px-7 py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40"
        >
          {{ t('hero.cta') }}
        </a>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="section-divider" />
    <div class="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="text-sm text-text-muted">
        {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
      </p>
      <div class="flex items-center gap-6">
        <a
          href="https://github.com/plduhoux"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-muted hover:text-text-primary transition-colors"
          aria-label="GitHub"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/plduhoux"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-muted hover:text-text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href="https://bsky.app/profile/plduhoux.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
          class="text-text-muted hover:text-text-primary transition-colors"
          aria-label="Bluesky"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.643 3.592 3.519 6.173 3.175-4.413.741-5.883 3.035-3.441 5.166 4.614 3.822 8.174-1.236 8.644-2.96.47 1.724 4.03 6.782 8.644 2.96 2.442-2.131.972-4.425-3.441-5.166 2.58.344 5.388-.532 6.173-3.175C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
          </svg>
        </a>
        <a
          href="mailto:pl.duhoux@gmail.com"
          class="text-text-muted hover:text-text-primary transition-colors"
          aria-label="Email"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>
