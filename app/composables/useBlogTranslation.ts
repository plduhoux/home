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

  // Parse path directly instead of relying on route.params (which can be empty during SSG)
  const isBlogArticle = computed(() => {
    const path = route.path.replace(/\/$/, '') // strip trailing slash
    const segments = path.split('/')
    // FR: /blog/slug  EN: /en/blog/slug
    const blogIndex = segments.indexOf('blog')
    return blogIndex !== -1 && blogIndex < segments.length - 1
  })

  const currentSlug = computed(() => {
    if (!isBlogArticle.value) return null
    const path = route.path.replace(/\/$/, '')
    const segments = path.split('/')
    // slug is everything after 'blog'
    const blogIndex = segments.indexOf('blog')
    return segments.slice(blogIndex + 1).join('/')
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
