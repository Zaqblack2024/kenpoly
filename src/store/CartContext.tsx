import { createContext, useContext, useMemo, useState } from 'react'
import products from '@/data/products'

interface CartLine {
  productId: number
  quantity: number
  variant: string
}

interface CartContextValue {
  lines: CartLine[]
  itemCount: number
  isOpen: boolean
  addItem: (productId: number, quantity?: number, variant?: string) => void
  updateQuantity: (productId: number, variant: string, quantity: number) => void
  removeItem: (productId: number, variant: string) => void
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setOpen] = useState(false)

  const value = useMemo<CartContextValue>(() => ({
    lines,
    isOpen,
    itemCount: lines.reduce((total, line) => total + line.quantity, 0),
    addItem: (productId, quantity = 1, variant = 'Standard') => {
      setLines((current) => {
        const match = current.find((line) => line.productId === productId && line.variant === variant)
        if (match) {
          return current.map((line) => line === match ? { ...line, quantity: line.quantity + quantity } : line)
        }
        return [...current, { productId, quantity, variant }]
      })
      setOpen(true)
    },
    updateQuantity: (productId, variant, quantity) => {
      setLines((current) => quantity < 1
        ? current.filter((line) => !(line.productId === productId && line.variant === variant))
        : current.map((line) => line.productId === productId && line.variant === variant ? { ...line, quantity } : line))
    },
    removeItem: (productId, variant) => {
      setLines((current) => current.filter((line) => !(line.productId === productId && line.variant === variant)))
    },
    setOpen,
  }), [isOpen, lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}

export function buildWhatsAppCartMessage(lines: CartLine[]) {
  const details = lines.map((line) => {
    const product = products.find((item) => item.id === line.productId)
    return `• ${product?.name ?? 'Product'} × ${line.quantity} (${line.variant}) — KSh ${((product?.price ?? 0) * line.quantity).toLocaleString()}`
  })
  const total = lines.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)
  return `Hello Kenpoly, I would like to place this order:\n\n${details.join('\n')}\n\nEstimated total: KSh ${total.toLocaleString()}\n\nPlease confirm availability and delivery.`
}
