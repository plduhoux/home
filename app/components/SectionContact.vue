<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="contact" class="relative py-16 md:py-24">


    <!-- Background glow -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/4 rounded-full blur-[150px]" />
    </div>

    <div class="relative mx-auto max-w-5xl px-6">
      <div class="max-w-xl">
        <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4 gradient-text-subtle">
          {{ t('contact.title') }}
        </h2>
        <p class="text-text-secondary leading-relaxed mb-8">
          {{ t('contact.subtitle') }}
        </p>

        <div class="space-y-4">
          <a
            href="mailto:pl.duhoux@gmail.com"
            class="card-glow flex items-center gap-3 p-4 rounded-2xl border border-border bg-bg-card hover:bg-bg-card-hover transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-text-primary">{{ t('contact.email') }}</p>
              <p class="text-sm text-text-secondary group-hover:text-accent transition-colors">pl.duhoux@gmail.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/plduhoux"
            target="_blank"
            rel="noopener noreferrer"
            class="card-glow flex items-center gap-3 p-4 rounded-2xl border border-border bg-bg-card hover:bg-bg-card-hover transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-xl bg-accent-2/10 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-accent-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-text-primary">LinkedIn</p>
              <p class="text-sm text-text-secondary group-hover:text-accent-2 transition-colors">linkedin.com/in/plduhoux</p>
            </div>
          </a>

          <a
            href="https://bsky.app/profile/plduhoux.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            class="card-glow flex items-center gap-3 p-4 rounded-2xl border border-border bg-bg-card hover:bg-bg-card-hover transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-xl bg-accent-3/10 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-accent-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.643 3.592 3.519 6.173 3.175-4.413.741-5.883 3.035-3.441 5.166 4.614 3.822 8.174-1.236 8.644-2.96.47 1.724 4.03 6.782 8.644 2.96 2.442-2.131.972-4.425-3.441-5.166 2.58.344 5.388-.532 6.173-3.175C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-text-primary">Bluesky</p>
              <p class="text-sm text-text-secondary group-hover:text-accent-3 transition-colors">@plduhoux.bsky.social</p>
            </div>
          </a>

          <div class="flex items-center gap-3 p-4 rounded-2xl border border-border bg-bg-card">
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-text-primary">{{ t('contact.location') }}</p>
              <p class="text-sm text-text-secondary">{{ t('contact.locationValue') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
