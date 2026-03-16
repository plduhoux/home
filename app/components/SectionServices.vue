<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="relative py-16 md:py-24">


    <div class="mx-auto max-w-5xl px-6">
      <div class="card-glow p-8 md:p-12 rounded-2xl border border-border bg-bg-card relative overflow-hidden">
        <!-- Background glow -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[100px]" />
          <div class="absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent-2/5 rounded-full blur-[80px]" />
        </div>

        <div class="relative">
          <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6 gradient-text">
            {{ t('services.title') }}
          </h2>
          <p class="text-text-secondary leading-relaxed mb-4 max-w-3xl">
            {{ t('services.description') }}
          </p>
          <p class="text-text-secondary leading-relaxed mb-8 max-w-3xl">
            {{ t('services.ai') }}
          </p>

          <!-- Social links -->
          <div class="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              class="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40"
            >
              {{ t('services.cta') }}
            </a>
            <div class="flex items-center gap-3">
              <a href="https://www.linkedin.com/in/plduhoux" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all" aria-label="LinkedIn">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://bsky.app/profile/plduhoux.bsky.social" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all" aria-label="Bluesky">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.643 3.592 3.519 6.173 3.175-4.413.741-5.883 3.035-3.441 5.166 4.614 3.822 8.174-1.236 8.644-2.96.47 1.724 4.03 6.782 8.644 2.96 2.442-2.131.972-4.425-3.441-5.166 2.58.344 5.388-.532 6.173-3.175C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>
              </a>
              <a href="https://gitlab.com/plduhoux" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all" aria-label="GitLab">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.387 9.452.045 13.587a.924.924 0 00.331 1.023L12 23.054l11.624-8.443a.92.92 0 00.331-1.024"/></svg>
              </a>
              <a href="https://github.com/plduhoux" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all" aria-label="GitHub">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://codepen.io/plduhoux" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all" aria-label="CodePen">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.144 13.067v-2.134L16.55 12zm1.856 1.018V9.915l-8 5.333v4.79zM12 18.96l-7.99-5.327V9.89L12 4.56l7.99 5.33v3.742zM4 14.085l8 5.333v-4.79l-8-5.333zm14.144-3.152L12 15.5l-6.144-4.567L12 6.37zM0 16.5V7.5L12 0l12 7.5v9L12 24z"/></svg>
              </a>
              <a href="mailto:pl.duhoux@gmail.com" class="w-9 h-9 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all" aria-label="Email">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
