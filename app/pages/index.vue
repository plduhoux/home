<script setup lang="ts">
const { t, locale } = useI18n()

const siteUrl = 'https://plduhoux.fr'

useHead({
  title: t('seo.title'),
  htmlAttrs: {
    lang: locale.value === 'fr' ? 'fr' : 'en',
  },
  meta: [
    { name: 'description', content: t('seo.description') },
    { property: 'og:title', content: t('seo.title') },
    { property: 'og:description', content: t('seo.description') },
    { property: 'og:image', content: `${siteUrl}/mebg.jpeg` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: locale.value === 'fr' ? siteUrl : `${siteUrl}/en` },
    { property: 'og:locale', content: locale.value === 'fr' ? 'fr_FR' : 'en_US' },
    { property: 'og:locale:alternate', content: locale.value === 'fr' ? 'en_US' : 'fr_FR' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: `${siteUrl}/mebg.jpeg` },
    { name: 'twitter:title', content: t('seo.title') },
    { name: 'twitter:description', content: t('seo.description') },
  ],
  link: [
    { rel: 'canonical', href: locale.value === 'fr' ? siteUrl : `${siteUrl}/en` },
    { rel: 'alternate', hreflang: 'fr', href: siteUrl },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en` },
    { rel: 'alternate', hreflang: 'x-default', href: siteUrl },
  ],
})
</script>

<template>
  <div>
    <SectionHero />
    <SectionAbout />
    <SectionServices />
    <SectionProjects />

    <SectionBlog />
    <SectionContact />
  </div>
</template>
