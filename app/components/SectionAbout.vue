<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="about" class="relative py-16 md:py-24">


    <div class="mx-auto max-w-5xl px-6">
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-12 gradient-text-subtle">
        {{ t('about.title') }}
      </h2>

      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <p class="text-text-secondary leading-relaxed">
            {{ t('about.p1') }}
          </p>
          <p class="text-text-secondary leading-relaxed">
            {{ t('about.p2') }}
          </p>
          <p class="text-text-secondary leading-relaxed">
            {{ t('about.p3') }}
          </p>
        </div>

        <div class="space-y-6">
          <div class="card-glow p-6 rounded-2xl border border-border bg-bg-card">
            <h3 class="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
              {{ t('about.journey') }}
            </h3>
            <ul class="space-y-3 text-text-secondary text-sm">
              <li class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{{ t('about.journey1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 rounded-full bg-accent-2 mt-2 shrink-0" />
                <span>{{ t('about.journey2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 rounded-full bg-accent-3 mt-2 shrink-0" />
                <span>{{ t('about.journey3') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{{ t('about.journey4') }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
