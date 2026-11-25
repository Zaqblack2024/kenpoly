# kenpoly.com Storefront

A modern, mobile-responsive ecommerce catalog for Kenpoly plastic products. The storefront uses product information and original imagery extracted from the supplied Kenpoly PDF documents, together with the provided brand logo.

## Highlights

- Searchable and category-filterable product catalog
- Responsive product grid with pricing in Kenyan shillings
- Product detail pages with image galleries, variants, quantities and related items
- In-page shopping cart with quantity controls
- WhatsApp agent ordering and click-to-call actions using `0108197844`
- Original Kenpoly product photography and branding from the supplied assets
- Accessible focus states, reduced-motion support and mobile navigation

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom responsive design system
- Lucide React icons
- Netlify deployment adapter

## Local Development

Requirements: Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev
```

The local Vite server runs on port `3000`. For Netlify platform emulation, use:

```bash
netlify dev --port 8889
```

## Production

```bash
pnpm build
```

Netlify publishes the generated client from `dist/client` according to `netlify.toml`.

## Project Structure

- `src/routes/` — storefront and product detail routes
- `src/components/` — product cards, shared site chrome and cart interface
- `src/store/` — cart state and WhatsApp order formatting
- `src/data/products.ts` — curated product catalog sourced from the supplied PDFs
- `src/styles.css` — complete responsive visual system
- `public/assets/catalog/` — extracted product photography
- `public/assets/kenpoly-logo.svg` — supplied Kenpoly logo
