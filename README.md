# plduhoux.fr

Personal portfolio and blog of Pierre-Louis Duhoux.

## Stack

- **Nuxt 4** (Vue 3, static generation)
- **Tailwind CSS 4**
- **Nuxt Content** (Markdown blog articles)
- **Nuxt i18n** (FR / EN)
- **Shiki** (syntax highlighting)

## Development

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3333
```

## Build & Deploy

Deployment is automatic via GitHub Actions on push to `main`.

```bash
npm run generate  # Static build in .output/public/
```

## Blog

Articles are stored in `content/blog/fr/` and `content/blog/en/` as Markdown files.

## License

All rights reserved.
