import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartDrawer, SiteFooter, SiteHeader } from '@/components/SiteChrome'
import { CartProvider } from '@/store/CartContext'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'kenpoly.com | Quality plastic products for every space' },
      { name: 'description', content: 'Shop durable Kenpoly chairs, household essentials, poultry products, bottles and industrial buckets in Kenya.' },
      { name: 'theme-color', content: '#0727a4' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap' },
      { rel: 'icon', href: '/assets/kenpoly-logo.svg' },
    ],
    scripts: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-Z0YKL27G1C', async: true },
      { children: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-Z0YKL27G1C');" },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
        <Scripts />
      </body>
    </html>
  )
}
