# AGENTS.md

## Project Overview

This repository contains the `kenpoly.com` ecommerce storefront, built with TanStack Start, React 19 and TypeScript for deployment on Netlify. It presents a curated product catalog sourced from the Kenpoly PDF documents supplied with the project. Checkout is intentionally handled through a Kenpoly order agent by WhatsApp or phone rather than through a payment gateway.

## Architecture

- `src/routes/__root.tsx` defines global metadata and wraps all pages with the site header, footer and cart provider.
- `src/routes/index.tsx` implements the home page, category navigation, search, sorting and filterable product grid.
- `src/routes/products/$productId.tsx` implements dynamic product detail pages with galleries, variants, quantities and related products.
- `src/data/products.ts` is the single source of truth for catalog content, prices, product images, variants and features.
- `src/store/CartContext.tsx` owns temporary client-side cart state and formats the WhatsApp order message.
- `src/components/SiteChrome.tsx` contains the shared header, footer and cart drawer.
- `src/components/ProductCard.tsx` contains reusable product-grid cards.
- `src/styles.css` contains the custom design system, responsive layouts and interaction styling.
- `public/assets/catalog/` contains product imagery extracted from the supplied PDF documents.

## Conventions

- Use strict TypeScript and the `@/` alias for imports from `src/`.
- Keep product content in `src/data/products.ts`; do not duplicate catalog records in routes.
- Use PascalCase for components and camelCase for functions and state.
- Prefer semantic HTML, keyboard-accessible controls and descriptive labels.
- Keep visual tokens in the `:root` section of `src/styles.css` and reuse the established blue, lime, pink and cream palette.
- Preserve responsive behavior at the existing `1100px`, `820px` and `560px` breakpoints.
- Product prices are represented as Kenyan shillings and displayed with `KSh`.

## Ordering Decisions

- The default customer contact is `0108197844` for both phone and WhatsApp actions.
- WhatsApp links use the international form `254108197844`.
- The official TikTok account is `https://www.tiktok.com/@kenpoly87`, linked from the footer.
- The Google tag `G-Z0YKL27G1C` is loaded globally from `src/routes/__root.tsx`.
- Cart state is intentionally session-only; the final order is sent to a human agent who confirms stock, delivery and payment.
- No database is required because the catalog is static and the cart is not intended to persist across sessions.

## Commands

- `pnpm dev` starts the local Vite development server.
- `netlify dev --port 8889` runs the site with Netlify emulation.
- `pnpm build` creates the production output consumed by Netlify.

Do not commit generated `dist`, `.netlify` or `.tanstack` directories.
