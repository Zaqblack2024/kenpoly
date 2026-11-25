import { Link } from '@tanstack/react-router'
import { Menu, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import products from '@/data/products'
import { buildWhatsAppCartMessage, useCart } from '@/store/CartContext'

const phoneDisplay = '0108197844'
const phoneInternational = '254108197844'
const tiktokUrl = 'https://www.tiktok.com/@kenpoly87'

export function SiteHeader() {
  const { itemCount, setOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="announcement">
        <span>Built for Kenya. Made for everyday life.</span>
      </div>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Kenpoly home">
          <img src="/assets/kenpoly-logo.svg" alt="Kenpoly" />
        </Link>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="/#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="/#collections" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="/#story" onClick={() => setMenuOpen(false)}>Why Kenpoly</a>
          <a href={`https://wa.me/${phoneInternational}`} target="_blank" rel="noreferrer">Talk to an agent</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <button className="cart-button" onClick={() => setOpen(true)}>
            <ShoppingBag size={19} />
            <span>Cart</span>
            <strong>{itemCount}</strong>
          </button>
        </div>
      </header>
    </>
  )
}

export function CartDrawer() {
  const { lines, isOpen, setOpen, updateQuantity, removeItem } = useCart()
  const total = lines.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)
  const message = buildWhatsAppCartMessage(lines)

  return (
    <div className={isOpen ? 'cart-shell is-open' : 'cart-shell'} aria-hidden={!isOpen}>
      <button className="cart-scrim" onClick={() => setOpen(false)} aria-label="Close cart" />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-heading">
          <div><span className="eyebrow">Your picks</span><h2>Shopping bag</h2></div>
          <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close cart"><X /></button>
        </div>
        {lines.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon"><ShoppingBag /></div>
            <h3>Your bag is ready for something useful.</h3>
            <p>Add favourites, then send the complete order to a Kenpoly agent on WhatsApp.</p>
            <button className="button button-dark" onClick={() => setOpen(false)}>Explore products</button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((line) => {
                const product = products.find((item) => item.id === line.productId)
                if (!product) return null
                return (
                  <article className="cart-line" key={`${line.productId}-${line.variant}`}>
                    <img src={product.image} alt="" />
                    <div className="cart-line-copy">
                      <h3>{product.name}</h3>
                      <p>{line.variant}</p>
                      <strong>KSh {(product.price * line.quantity).toLocaleString()}</strong>
                      <div className="quantity-stepper compact">
                        <button onClick={() => updateQuantity(line.productId, line.variant, line.quantity - 1)} aria-label="Decrease quantity"><Minus /></button>
                        <span>{line.quantity}</span>
                        <button onClick={() => updateQuantity(line.productId, line.variant, line.quantity + 1)} aria-label="Increase quantity"><Plus /></button>
                      </div>
                    </div>
                    <button className="remove-line" onClick={() => removeItem(line.productId, line.variant)} aria-label={`Remove ${product.name}`}><Trash2 /></button>
                  </article>
                )
              })}
            </div>
            <div className="cart-footer">
              <div className="cart-total"><span>Estimated total</span><strong>KSh {total.toLocaleString()}</strong></div>
              <p>Delivery and stock are confirmed by your order agent.</p>
              <a className="button button-whatsapp" href={`https://wa.me/${phoneInternational}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Order with an agent</a>
              <a className="button button-outline" href={`tel:${phoneDisplay}`}>Call {phoneDisplay}</a>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-brand">
        <img src="/assets/kenpoly-logo.svg" alt="Kenpoly" />
        <h2>Useful things.<br />Beautifully sorted.</h2>
        <p>Durable plastic products for homes, businesses, farms and everyday Kenyan life.</p>
      </div>
      <div className="footer-links"><span>Explore</span><a href="/#shop">Shop all</a><a href="/#collections">Collections</a><a href="/#story">Our promise</a></div>
      <div className="footer-links"><span>Order help</span><a href={`https://wa.me/${phoneInternational}`} target="_blank" rel="noreferrer">WhatsApp {phoneDisplay}</a><a href={`tel:${phoneDisplay}`}>Call {phoneDisplay}</a><a href={tiktokUrl} target="_blank" rel="noreferrer">TikTok @kenpoly87</a><a href="mailto:care@kenpoly.com">care@kenpoly.com</a></div>
      <div className="footer-bottom"><span>© 2026 kenpoly.com</span><span>Lunga Lunga Road, Industrial Area, Nairobi</span></div>
    </footer>
  )
}
