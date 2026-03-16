// Mapping of blog slugs between FR and EN
const slugMap: Record<string, string> = {
  'arenai-genese': 'arenai-genesis',
  'arenai-genesis': 'arenai-genese',
  'developper-avec-un-agent-ia': 'developing-with-an-ai-agent',
  'developing-with-an-ai-agent': 'developper-avec-un-agent-ia',
  'revolutionnez-votre-app-avec-chatgpt': 'revolutionize-your-app-with-chatgpt',
  'revolutionize-your-app-with-chatgpt': 'revolutionnez-votre-app-avec-chatgpt',
  // Same slug in both languages
  'llms-are-hardware': 'llms-are-hardware',
}

export function useBlogTranslation() {
  const route = useRoute()
  const { locale } = useI18n()

  const isBlogArticle = computed(() => {
    return route.path.includes('/blog/') && route.params.slug
  })

  const currentSlug = computed(() => {
    if (!isBlogArticle.value) return null
    const parts = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]
    return parts.join('/')
  })

  const translatedPath = computed(() => {
    if (!currentSlug.value) return null
    const otherLocale = locale.value === 'fr' ? 'en' : 'fr'
    const translatedSlug = slugMap[currentSlug.value] || currentSlug.value
    const base = otherLocale === 'fr' ? '' : '/en'
    return `${base}/blog/${translatedSlug}`
  })

  return {
    isBlogArticle,
    translatedPath,
  }
}
