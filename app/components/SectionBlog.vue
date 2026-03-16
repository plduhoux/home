<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { data: posts } = await useAsyncData(`blog-preview-${locale.value}`, () =>
  queryCollection('content')
    .where('path', 'LIKE', `/blog/${locale.value}/%`)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

function blogLink(contentPath: string): string {
  const withoutLocale = contentPath.replace(`/blog/${locale.value}/`, '/blog/')
  return localePath(withoutLocale)
}
</script>

<template>
  <section id="blog" class="relative py-16 md:py-24">


    <div class="mx-auto max-w-5xl px-6">
      <div class="flex items-end justify-between mb-12">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4 gradient-text-subtle">
            {{ t('blog.title') }}
          </h2>
          <p class="text-text-secondary max-w-xl">
            {{ t('blog.subtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/blog')"
          class="hidden md:inline-flex text-sm text-accent hover:text-accent-hover transition-colors"
        >
          {{ t('blog.allPosts') }}
        </NuxtLink>
      </div>

      <div v-if="posts && posts.length" class="grid gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="blogLink(post.path)"
          class="card-glow group p-6 rounded-2xl border border-border bg-bg-card hover:bg-bg-card-hover transition-all duration-400"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
            <h3 class="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
              {{ post.title }}
            </h3>
            <span v-if="post.date" class="text-sm text-text-muted shrink-0">
              {{ new Date(post.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </span>
          </div>
          <p v-if="post.description" class="text-sm text-text-secondary leading-relaxed">
            {{ post.description }}
          </p>
        </NuxtLink>
      </div>

      <div v-else class="p-8 rounded-2xl border border-border bg-bg-card text-center">
        <p class="text-text-muted">{{ t('blog.empty') }}</p>
      </div>

      <NuxtLink
        :to="localePath('/blog')"
        class="mt-6 md:hidden inline-flex text-sm text-accent hover:text-accent-hover transition-colors"
      >
        {{ t('blog.allPosts') }}
      </NuxtLink>
    </div>
  </section>
</template>
