<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')
const { t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

const home = localePath('/')
const navLinks = computed(() => [
  { label: t('nav.about'), href: `${home}#about`, internal: false },
  { label: t('nav.projects'), href: `${home}#projects`, internal: false },
  { label: t('nav.blog'), href: localePath('/blog'), internal: true },
  { label: t('nav.contact'), href: `${home}#contact`, internal: false },
])

const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}

const otherLocale = computed(() => locale.value === 'fr' ? 'en' : 'fr')
const isCurrentFr = computed(() => locale.value === 'fr')

// Use blog translation path when on a blog article, otherwise default switchLocalePath
const { isBlogArticle, translatedPath } = useBlogTranslation()
const switchPath = computed(() => {
  if (isBlogArticle.value && translatedPath.value) {
    return translatedPath.value
  }
  return switchLocalePath(otherLocale.value)
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
    <nav class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
      <NuxtLink :to="localePath('/')" class="text-lg font-semibold text-text-primary hover:text-accent transition-colors">
        Pierre-Louis Duhoux
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <template v-for="link in navLinks" :key="link.href">
          <NuxtLink
            v-if="link.internal"
            :to="link.href"
            class="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {{ link.label }}
          </a>
        </template>

        <!-- Language switcher (use <a> on blog articles to force full reload, otherwise useAsyncData won't refetch) -->
        <component
          :is="isBlogArticle ? 'a' : NuxtLink"
          :to="isBlogArticle ? undefined : switchPath"
          :href="isBlogArticle ? switchPath : undefined"
          class="inline-flex items-center px-1.5 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          :aria-label="isCurrentFr ? 'Switch to English' : 'Passer en français'"
        >
          <img v-if="isCurrentFr" src="/flags/gb.svg" alt="English" class="w-auto h-4 rounded-sm" />
          <img v-else src="/flags/fr.svg" alt="Français" class="w-auto h-4 rounded-sm" />
        </component>
      </div>

      <!-- Mobile toggle -->
      <div class="flex md:hidden items-center gap-3">
        <component
          :is="isBlogArticle ? 'a' : NuxtLink"
          :to="isBlogArticle ? undefined : switchPath"
          :href="isBlogArticle ? switchPath : undefined"
          class="inline-flex items-center px-1.5 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          :aria-label="isCurrentFr ? 'Switch to English' : 'Passer en français'"
        >
          <img v-if="isCurrentFr" src="/flags/gb.svg" alt="English" class="w-auto h-4 rounded-sm" />
          <img v-else src="/flags/fr.svg" alt="Français" class="w-auto h-4 rounded-sm" />
        </component>
        <button
          class="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
        <div class="px-6 py-4 flex flex-col gap-4">
          <template v-for="link in navLinks" :key="link.href">
            <NuxtLink
              v-if="link.internal"
              :to="link.href"
              class="text-sm text-text-secondary hover:text-text-primary transition-colors"
              @click="closeMobile"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              class="text-sm text-text-secondary hover:text-text-primary transition-colors"
              @click="closeMobile"
            >
              {{ link.label }}
            </a>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>
