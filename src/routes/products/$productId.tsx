import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Check, Minus, Phone, Plus, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import products from '@/data/products'
import { useCart } from '@/store/CartContext'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
  loader: async ({ params }) => {
    const product = products.find((item) => item.id === Number(params.productId))
    if (!product) throw new Error('Product not found')
    return product
  },
})

function ProductDetail() {
  const product = Route.useLoaderData()
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(product.gallery[0])
  const [quantity, setQuantity] = useState(1)
  const [selections, setSelections] = useState<Record<string, string>>(() => Object.fromEntries(product.variants.map((variant) => [variant.name, variant.values[0]])))
  const variantSummary = Object.entries(selections).map(([key, value]) => `${key}: ${value}`).join(', ')
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)
  const whatsappMessage = `Hello Kenpoly, I am interested in ${product.name} (${variantSummary}), quantity ${quantity}. Please confirm availability and delivery.`

  useEffect(() => {
    setActiveImage(product.gallery[0])
    setQuantity(1)
    setSelections(Object.fromEntries(product.variants.map((variant) => [variant.name, variant.values[0]])))
  }, [product])

  return (
    <>
      <section className="product-detail">
        <div className="product-gallery">
          <div className="gallery-main"><span className="gallery-tag">{product.category}</span><img src={activeImage} alt={product.name} /></div>
          <div className="gallery-thumbs">{product.gallery.map((image, index) => <button className={activeImage === image ? 'active' : ''} onClick={() => setActiveImage(image)} key={image}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div>
        </div>
        <div className="product-info">
          <Link to="/" hash="shop" className="back-link"><ArrowLeft /> Back to shop</Link>
          {product.badge && <span className="detail-badge">{product.badge}</span>}
          <h1>{product.name}</h1>
          <div className="rating-row"><span><Star fill="currentColor" /> {product.rating}</span><span>{product.reviews} customer reviews</span></div>
          <div className="detail-price">KSh {product.price.toLocaleString()}</div>
          <p className="detail-description">{product.description}</p>
          <div className="feature-list">{product.features.map((feature) => <span key={feature}><Check /> {feature}</span>)}</div>
          {product.variants.map((variant) => (
            <fieldset className="variant-field" key={variant.name}>
              <legend>{variant.name}: <strong>{selections[variant.name]}</strong></legend>
              <div>{variant.values.map((value) => <button type="button" className={selections[variant.name] === value ? 'active' : ''} onClick={() => setSelections((current) => ({ ...current, [variant.name]: value }))} key={value}>{value}</button>)}</div>
            </fieldset>
          ))}
          <div className="purchase-row">
            <div className="quantity-stepper"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus /></button></div>
            <button className="button button-dark add-cart" onClick={() => addItem(product.id, quantity, variantSummary)}><ShoppingBag /> Add to cart</button>
          </div>
          <div className="agent-actions"><a className="button button-whatsapp" href={`https://wa.me/254108197844?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer">Order with an agent</a><a className="button button-outline" href="tel:0108197844"><Phone /> Call 0108197844</a></div>
          <div className="detail-assurance"><span><Truck /> Delivery arranged nationwide</span><span><ShieldCheck /> Genuine Kenpoly quality</span></div>
        </div>
      </section>
      {related.length > 0 && <section className="related-section"><div className="section-heading split"><div><span className="eyebrow">Keep exploring</span><h2>More in {product.category}.</h2></div><Link to="/" hash="shop">See the full collection</Link></div><div className="product-grid related-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>}
    </>
  )
}
