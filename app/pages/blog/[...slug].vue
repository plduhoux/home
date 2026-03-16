<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = computed(() => {
  const parts = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]
  return parts.join('/')
})

// URL: /blog/pourquoi-nuxt -> content path: /blog/fr/pourquoi-nuxt
const contentPath = computed(() => `/blog/${locale.value}/${slug.value}`)

const { data: post } = await useAsyncData(`blog-${contentPath.value}`, () =>
  queryCollection('content').path(contentPath.value).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article non trouve' })
}

// Translation paths for hreflang
const { translatedPath } = useBlogTranslation()
const otherLocale = computed(() => locale.value === 'fr' ? 'en' : 'fr')

const currentPath = computed(() => {
  const base = locale.value === 'fr' ? '' : '/en'
  return `${base}/blog/${slug.value}`
})

const siteUrl = 'https://plduhoux.fr'
const frPath = computed(() => locale.value === 'fr' ? currentPath.value : translatedPath.value || currentPath.value)
const enPath = computed(() => locale.value === 'en' ? currentPath.value : translatedPath.value || currentPath.value)

useHead({
  title: `${post.value.title} - Pierre-Louis Duhoux`,
  htmlAttrs: {
    lang: locale.value === 'fr' ? 'fr' : 'en',
  },
  meta: [
    { name: 'description', content: post.value.description || '' },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteUrl}${currentPath.value}` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}${currentPath.value}` },
    { rel: 'alternate', hreflang: 'fr', href: `${siteUrl}${frPath.value}` },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}${enPath.value}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}${frPath.value}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.value.title,
        'description': post.value.description || '',
        'datePublished': post.value.date,
        'author': {
          '@type': 'Person',
          'name': 'Pierre-Louis Duhoux',
          'url': 'https://plduhoux.fr',
        },
        'publisher': {
          '@type': 'Person',
          'name': 'Pierre-Louis Duhoux',
        },
        'url': `${siteUrl}${currentPath.value}`,
        'inLanguage': locale.value === 'fr' ? 'fr-FR' : 'en-US',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${siteUrl}${currentPath.value}`,
        },
      }),
    },
  ],
})

defineOgImageComponent('Blog', {
  title: post.value.title,
  description: post.value.description || '',
})
</script>

<template>
  <div class="pt-32 pb-24 md:pt-40 md:pb-32">
    <div class="mx-auto max-w-3xl px-6">
      <NuxtLink
        :to="localePath('/blog')"
        class="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-8"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {{ t('blog.back') }}
      </NuxtLink>

      <article v-if="post">
        <header class="mb-12">
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {{ post.title }}
          </h1>
          <div class="flex flex-col gap-3">
            <span v-if="post.date" class="text-sm text-text-muted">
              {{ new Date(post.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </span>
            <div v-if="post.tags" class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="text-xs px-2.5 py-1 rounded-md bg-bg-card border border-border text-text-muted"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </header>

        <div class="prose-dark">
          <ContentRenderer :value="post" />
        </div>
      </article>
    </div>
  </div>
</template>
