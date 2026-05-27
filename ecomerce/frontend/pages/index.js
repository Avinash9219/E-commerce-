import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products')
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
  }, [])

  return (
    <main className="app-root">
      <header className="topbar">
        <h1 className="brand">Premium Hamper Co.</h1>
        <nav>
          <Link href="/birthday">Birthday Hampers</Link>
          <Link href="/anniversary">Anniversary Hampers</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/admin/login">Admin</Link>
        </nav>
      </header>

      <section className="hero">
        <h2>Curated premium hampers for every celebration</h2>
        <p>Hand-picked luxury gifts wrapped in love.</p>
      </section>

      <section className="product-grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </section>

      <footer className="footer">© {new Date().getFullYear()} Premium Hamper Co.</footer>
    </main>
  )
}
