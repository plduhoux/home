import { defineSitemapEventHandler, asSitemapUrl } from '#imports'

// Blog articles with their translations
const blogArticles = [
  {
    fr: 'revolutionnez-votre-app-avec-chatgpt',
    en: 'revolutionize-your-app-with-chatgpt',
    date: '2024-05-20',
  },
  {
    fr: 'llms-are-hardware',
    en: 'llms-are-hardware',
    date: '2025-12-03',
  },
  {
    fr: 'developper-avec-un-agent-ia',
    en: 'developing-with-an-ai-agent',
    date: '2026-02-25',
  },
  {
    fr: 'arenai-genese',
    en: 'arenai-genesis',
    date: '2026-03-15',
  },
]

export default defineSitemapEventHandler(() => {
  const urls = []

  for (const article of blogArticles) {
    // FR version
    urls.push(asSitemapUrl({
      loc: `/blog/${article.fr}`,
      lastmod: article.date,
      alternatives: [
        { hreflang: 'fr', href: `https://plduhoux.fr/blog/${article.fr}` },
        { hreflang: 'en', href: `https://plduhoux.fr/en/blog/${article.en}` },
      ],
    }))

    // EN version
    urls.push(asSitemapUrl({
      loc: `/en/blog/${article.en}`,
      lastmod: article.date,
      alternatives: [
        { hreflang: 'fr', href: `https://plduhoux.fr/blog/${article.fr}` },
        { hreflang: 'en', href: `https://plduhoux.fr/en/blog/${article.en}` },
      ],
    }))
  }

  return urls
})
