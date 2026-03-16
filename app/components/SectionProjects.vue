<script setup lang="ts">
const { t, tm, rt } = useI18n()

const activeFilter = ref<string | null>(null)
const expanded = ref<Set<string>>(new Set())

function toggle(key: string) {
  if (expanded.value.has(key)) {
    expanded.value.delete(key)
  } else {
    expanded.value.add(key)
  }
  expanded.value = new Set(expanded.value)
}

const allTagKeys = ['mobile', 'saas', 'ai', 'personal', 'opensource', 'ionic', 'nuxtjs']

interface Project {
  key: string
  title: string
  role: string
  period: string
  description: string
  context: string
  highlights: string[]
  tags: string[]
  filterTags: string[]
  images: string[]
  link?: string
  github?: string
  gitlab?: string
  current?: boolean
  stopped?: boolean
}

const projects = computed<Project[]>(() => {
  const raw = tm('projects.list') as any[]
  return raw.map(p => ({
    key: rt(p.key),
    title: rt(p.title),
    role: rt(p.role),
    period: rt(p.period),
    description: rt(p.description),
    context: rt(p.context),
    highlights: Array.isArray(p.highlights) ? p.highlights.map((h: any) => rt(h)) : [],
    tags: Array.isArray(p.tags) ? p.tags.map((t: any) => rt(t)) : [],
    filterTags: Array.isArray(p.filterTags) ? p.filterTags.map((t: any) => rt(t)) : [],
    images: Array.isArray(p.images) ? p.images.map((i: any) => rt(i)) : [],
    link: p.link ? rt(p.link) : undefined,
    github: p.github ? rt(p.github) : undefined,
    gitlab: p.gitlab ? rt(p.gitlab) : undefined,
    current: !!p.current,
    stopped: !!p.stopped,
  }))
})

// Open current projects by default
watchEffect(() => {
  const currentKeys = projects.value.filter(p => p.current).map(p => p.key)
  if (expanded.value.size === 0 && currentKeys.length > 0) {
    expanded.value = new Set(currentKeys)
  }
})

const filteredProjects = computed(() => {
  if (!activeFilter.value) return projects.value
  return projects.value.filter(p => p.filterTags.includes(activeFilter.value!))
})
</script>

<template>
  <section id="projects" class="relative py-16 md:py-24">

    <!-- Subtle background glow -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[150px]" />
    </div>

    <div class="relative mx-auto max-w-5xl px-6">
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4 gradient-text-subtle">
        {{ t('projects.title') }}
      </h2>
      <p class="text-text-secondary mb-8 max-w-xl">
        {{ t('projects.subtitle') }}
      </p>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          class="text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer"
          :class="activeFilter === null
            ? 'border-accent bg-accent/10 text-accent'
            : 'border-border text-text-muted hover:border-border-hover hover:text-text-secondary'"
          @click="activeFilter = null"
        >
          {{ t('projects.filterAll') }}
        </button>
        <button
          v-for="tagKey in allTagKeys"
          :key="tagKey"
          class="text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer"
          :class="activeFilter === tagKey
            ? 'border-accent bg-accent/10 text-accent'
            : 'border-border text-text-muted hover:border-border-hover hover:text-text-secondary'"
          @click="activeFilter = activeFilter === tagKey ? null : tagKey"
        >
          {{ t(`projects.filterTags.${tagKey}`) }}
        </button>
      </div>

      <div class="grid gap-4">
        <TransitionGroup
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-for="project in filteredProjects"
            :key="project.key"
            class="card-glow group rounded-2xl border border-border bg-bg-card hover:bg-bg-card-hover transition-all duration-400"
          >
            <!-- Summary (clickable to toggle) -->
            <div class="p-6 cursor-pointer" @click="toggle(project.key)">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <div class="flex items-center gap-3">
                    <h3 class="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                      <a
                        v-if="project.link"
                        :href="project.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5"
                        @click.stop
                      >
                        {{ project.title }}
                        <svg class="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                      <span v-else>{{ project.title }}</span>
                    </h3>
                    <a
                      v-if="project.github"
                      :href="project.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-7 h-7 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all"
                      aria-label="GitHub"
                      @click.stop
                    >
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a
                      v-if="project.gitlab"
                      :href="project.gitlab"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-7 h-7 rounded-lg border border-border hover:border-accent/40 flex items-center justify-center text-text-muted hover:text-accent transition-all"
                      aria-label="GitLab"
                      @click.stop
                    >
                      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.387 9.452.045 13.587a.924.924 0 00.331 1.023L12 23.054l11.624-8.443a.92.92 0 00.331-1.024"/></svg>
                    </a>
                    <span v-if="project.current" class="text-xs text-accent bg-accent/10 px-2.5 py-0.5 rounded-full font-medium">
                      {{ t('projects.current') }}
                    </span>
                    <span v-if="project.stopped" class="text-xs text-text-muted bg-text-muted/10 px-2.5 py-0.5 rounded-full font-medium">
                      {{ t('projects.stopped') }}
                    </span>
                  </div>
                  <p class="text-sm text-text-muted mt-1">{{ project.role }}</p>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <span class="text-sm text-text-muted">{{ project.period }}</span>
                  <svg
                    class="w-4 h-4 text-text-muted transition-transform duration-300"
                    :class="{ 'rotate-180': expanded.has(project.key) }"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <p class="text-sm text-text-secondary leading-relaxed mb-4">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="text-xs px-2.5 py-1 rounded-lg bg-bg-elevated border border-border text-text-muted"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Expanded details -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[800px] opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-[800px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="expanded.has(project.key)" class="overflow-hidden">
                <div class="px-6 pb-6">
                  <div class="border-t border-border/50 pt-5 mt-1">
                    <!-- Project images -->
                    <div v-if="project.images && project.images.length" class="mb-5" @click.stop>
                      <ImageLightbox :images="project.images" :alt="project.title" />
                    </div>
                    <p class="text-sm text-text-secondary leading-relaxed mb-5">
                      {{ project.context }}
                    </p>
                    <ul class="space-y-2.5">
                      <li
                        v-for="(highlight, i) in project.highlights"
                        :key="i"
                        class="flex items-start gap-3 text-sm text-text-secondary"
                      >
                        <span
                          class="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          :class="{
                            'bg-accent': i % 3 === 0,
                            'bg-accent-2': i % 3 === 1,
                            'bg-accent-3': i % 3 === 2,
                          }"
                        />
                        <span>{{ highlight }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>
