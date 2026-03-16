<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const siteUrl = 'https://plduhoux.fr'

useHead({
  title: `${t('blog.title')} - Pierre-Louis Duhoux`,
  htmlAttrs: {
    lang: locale.value === 'fr' ? 'fr' : 'en',
  },
  link: [
    { rel: 'canonical', href: locale.value === 'fr' ? `${siteUrl}/blog` : `${siteUrl}/en/blog` },
    { rel: 'alternate', hreflang: 'fr', href: `${siteUrl}/blog` },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en/blog` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/blog` },
  ],
})

const { data: posts } = await useAsyncData(`blog-list-${locale.value}`, () =>
  queryCollection('content')
    .where('path', 'LIKE', `/blog/${locale.value}/%`)
    .order('date', 'DESC')
    .all()
)

function blogLink(contentPath: string): string {
  const withoutLocale = contentPath.replace(`/blog/${locale.value}/`, '/blog/')
  return localePath(withoutLocale)
}
</script>

<template>
  <div class="pt-32 pb-24 md:pt-40 md:pb-32">
    <div class="mx-auto max-w-3xl px-6">
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        {{ t('blog.title') }}
      </h1>
      <p class="text-text-secondary mb-12 max-w-xl">
        {{ t('blog.subtitle') }}
      </p>

      <div v-if="posts && posts.length" class="grid gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="blogLink(post.path)"
          class="group p-6 rounded-xl border border-border bg-bg-card hover:bg-bg-card-hover hover:border-border-hover transition-all duration-300"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
            <h2 class="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
              {{ post.title }}
            </h2>
            <span v-if="post.date" class="text-sm text-text-muted shrink-0">
              {{ new Date(post.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </span>
          </div>
          <p v-if="post.description" class="text-sm text-text-secondary leading-relaxed">
            {{ post.description }}
          </p>
          <div v-if="post.tags" class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs px-2.5 py-1 rounded-md bg-bg border border-border text-text-muted"
            >
              {{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="p-12 rounded-xl border border-border bg-bg-card text-center">
        <p class="text-text-muted">{{ t('blog.empty') }}</p>
      </div>
    </div>
  </div>
</template>
