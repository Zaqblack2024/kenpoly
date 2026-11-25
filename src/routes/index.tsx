import { createFileRoute } from '@tanstack/react-router'
import { ArrowDown, ArrowRight, BadgeCheck, RotateCcw, Search, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import products, { type ProductCategory } from '@/data/products'

export const Route = createFileRoute('/')({ component: Storefront })

const categories: Array<'All' | ProductCategory> = ['All', 'Chairs', 'Household', 'Poultry', 'Bottles & Lunch Boxes', 'Industrial']

function Storefront() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [sort, setSort] = useState('featured')

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesQuery = !normalized || `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return a.id - b.id
    })
  }, [category, query, sort])

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-logo"><img src="/assets/kenpoly-logo.svg" alt="Kenpoly" /></div>
          <span className="eyebrow light"><Sparkles size={14} /> The everyday, upgraded</span>
          <h1>Made to live<br /><em>with you.</em></h1>
          <p>Colourful, hardworking essentials made for Kenyan homes, farms, businesses and all the beautifully busy moments between.</p>
          <div className="hero-actions"><a className="button button-lime" href="#shop">Shop the collection <ArrowDown /></a><a className="text-link" href="https://wa.me/254108197844" target="_blank" rel="noreferrer">Order with an agent <ArrowRight /></a></div>
          <div className="hero-proof"><div><strong>40+</strong><span>years of making</span></div><div><strong>121+</strong><span>household essentials</span></div><div><strong>100%</strong><span>made for real life</span></div></div>
        </div>
        <div className="hero-stage" aria-label="Featured Kenpoly products">
          <div className="orb orb-lime" />
          <div className="orb orb-blue" />
          <div className="hero-product hero-chair"><span className="float-label">Sit easy <b>KSh 1,124</b></span><img src="/assets/catalog/comfi-chair-2045.png" alt="Blue Kenpoly Comfi Chair" /></div>
          <div className="hero-product hero-bottle"><span className="float-label">Go anywhere</span><img src="/assets/catalog/grip-sport-bottle.png" alt="Kenpoly sport bottle" /></div>
          <div className="hero-stamp"><span>KENPOLY</span><strong>Built to be used</strong><small>again + again + again</small></div>
        </div>
      </section>

      <section className="benefit-strip" aria-label="Store benefits">
        <div><ShieldCheck /><span><strong>Durable by design</strong>Made for daily use</span></div>
        <div><BadgeCheck /><span><strong>Trusted quality</strong>Kenpoly original products</span></div>
        <div><Truck /><span><strong>Delivery arranged</strong>Across Kenya</span></div>
        <div><RotateCcw /><span><strong>Human support</strong>Order with a real agent</span></div>
      </section>

      <section className="collections-section" id="collections">
        <div className="section-heading split"><div><span className="eyebrow">Find your colour</span><h2>Good design belongs<br />in every corner.</h2></div><p>From the chair you reach for every morning to the feeder that keeps a farm moving, Kenpoly makes practical products feel considered.</p></div>
        <div className="collection-grid">
          <button className="collection-card cobalt" onClick={() => { setCategory('Chairs'); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }) }}><span>01 / Furniture</span><h3>Take<br />a seat.</h3><img src="/assets/catalog/empire-chair.png" alt="Empire Chair" /><b>13 designs <ArrowRight /></b></button>
          <button className="collection-card pink" onClick={() => { setCategory('Household'); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }) }}><span>02 / Home</span><h3>Sort<br />your space.</h3><img src="/assets/catalog/tall-laundry-basket.jpg" alt="Laundry basket" /><b>121 essentials <ArrowRight /></b></button>
          <button className="collection-card lime" onClick={() => { setCategory('Poultry'); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }) }}><span>03 / Farm</span><h3>Grow<br />strong.</h3><img src="/assets/catalog/chicken-drinker-no1.png" alt="Chicken drinker" /><b>Farm essentials <ArrowRight /></b></button>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading"><span className="eyebrow">The Kenpoly edit</span><h2>Everyday heroes.</h2></div>
        <div className="shop-toolbar">
          <label className="search-field"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chairs, buckets, bottles…" /><span>{visibleProducts.length} products</span></label>
          <div className="category-pills" role="group" aria-label="Product categories">
            {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <label className="sort-field"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label>
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">{visibleProducts.map((product, index) => <ProductCard product={product} priority={index < 4} key={product.id} />)}</div>
        ) : (
          <div className="no-results"><Search /><h3>No products matched that search.</h3><p>Try another phrase or reset the category to see the full collection.</p><button className="button button-dark" onClick={() => { setQuery(''); setCategory('All') }}>Show all products</button></div>
        )}
      </section>

      <section className="story-section" id="story">
        <div className="story-visual"><div className="story-circle"><img src="/assets/catalog/wave-basin.jpg" alt="Colourful Kenpoly basin" /></div><span className="story-note">Strong enough<br />for real life.</span></div>
        <div className="story-copy"><span className="eyebrow light">Why Kenpoly</span><h2>Plastic,<br /><em>with purpose.</em></h2><p>We believe useful things should last, feel good to use and bring a little colour to the everyday. That is why our products are designed around real homes, real work and real routines.</p><div className="story-values"><span>01 <b>Durable materials</b></span><span>02 <b>Practical details</b></span><span>03 <b>Accessible prices</b></span></div><a className="button button-lime" href="https://wa.me/254108197844" target="_blank" rel="noreferrer">Talk to a Kenpoly agent <ArrowRight /></a></div>
      </section>
    </>
  )
}
