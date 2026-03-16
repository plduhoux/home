# plduhoux.fr

Portfolio et blog personnel de Pierre-Louis Duhoux.

## Stack

- **Nuxt 4** (Vue 3, static generation)
- **Tailwind CSS 4**
- **Nuxt Content** (articles de blog en Markdown)
- **Nuxt i18n** (FR / EN)
- **Shiki** (syntax highlighting)

## Dev

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 3333
```

## Build & Deploy

Le déploiement est automatique via GitHub Actions sur push `main`.

```bash
npm run generate  # Build statique dans .output/public/
```

## Blog

Les articles sont dans `content/blog/fr/` et `content/blog/en/` au format Markdown.

## Licence

Tous droits réservés.
