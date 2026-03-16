<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="relative min-h-svh flex items-center justify-center overflow-hidden">
    <!-- Background gradient orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[150px]" />
      <div class="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent-2/6 rounded-full blur-[120px]" />
      <div class="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-accent-3/5 rounded-full blur-[100px]" />
    </div>

    <div class="relative mx-auto max-w-5xl px-6 text-center">
      <!-- Photo -->
      <div class="mb-8 animate-slide-up">
        <img
          src="/polo.webp"
          alt="Pierre-Louis Duhoux"
          class="w-28 h-28 md:w-36 md:h-36 rounded-full mx-auto object-cover ring-2 ring-border ring-offset-4 ring-offset-bg shadow-xl shadow-accent/10"
          fetchpriority="high"
        />
      </div>

      <p class="text-sm text-accent font-medium tracking-widest uppercase mb-6 animate-fade-in-up animate-delay-100">
        {{ t('hero.location') }}
      </p>
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 animate-slide-up">
        <span class="gradient-text">Pierre-Louis</span><br />
        <span class="gradient-text">Duhoux</span>
      </h1>
      <p class="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up animate-delay-300">
        {{ t('hero.tagline') }}
      </p>
      <div class="flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-400">
        <a
          href="#contact"
          class="inline-flex items-center px-7 py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40"
        >
          {{ t('hero.cta') }}
        </a>
        <a
          href="#projects"
          class="inline-flex items-center px-7 py-3.5 border border-border-hover hover:border-accent/40 text-text-secondary hover:text-text-primary text-sm font-medium rounded-xl transition-all duration-300"
        >
          {{ t('hero.cta2') }}
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animate-delay-500">
      <div class="w-5 h-8 rounded-full border-2 border-border-hover flex justify-center pt-1.5">
        <div class="w-1 h-2 rounded-full bg-text-muted animate-bounce" />
      </div>
    </div>
  </section>
</template>
