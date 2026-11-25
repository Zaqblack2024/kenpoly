import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/store/CartContext'

export function BuyButton({ productId, className = '', quantity = 1, variant = 'Standard' }: { productId: number; className?: string; quantity?: number; variant?: string }) {
  const { addItem } = useCart()
  return <button type="button" onClick={() => addItem(productId, quantity, variant)} className={className}><ShoppingBag /> Add to cart</button>
}
