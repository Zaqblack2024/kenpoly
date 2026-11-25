import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Plus, Star } from 'lucide-react'
import type { Product } from '@/data/products'
import { useCart } from '@/store/CartContext'

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart()
  return (
    <article className="product-card">
      <Link to="/products/$productId" params={{ productId: product.id.toString() }} className="product-card-image">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} loading={priority ? 'eager' : 'lazy'} />
        <span className="view-product">View product <ArrowUpRight /></span>
      </Link>
      <div className="product-card-body">
        <div className="product-meta"><span>{product.category}</span><span><Star size={13} fill="currentColor" /> {product.rating}</span></div>
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}><h3>{product.name}</h3></Link>
        <p>{product.shortDescription}</p>
        <div className="product-card-bottom">
          <strong>KSh {product.price.toLocaleString()}</strong>
          <button onClick={() => addItem(product.id)} aria-label={`Add ${product.name} to cart`}><Plus /> Add</button>
        </div>
      </div>
    </article>
  )
}
