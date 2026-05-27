import { useState } from 'react'

export default function ProductCard({ product }){
  const [qty, setQty] = useState(1)

  const addWishlist = ()=>{
    const w = JSON.parse(localStorage.getItem('wishlist') || '[]')
    w.push({ productId: product._id, name: product.name, price: product.price, quantity: qty })
    localStorage.setItem('wishlist', JSON.stringify(w))
    // simple toast
    const t = document.createElement('div')
    t.className = 'toast'
    t.innerText = 'Added to wishlist'
    document.body.appendChild(t)
    setTimeout(()=>t.remove(),2000)
  }

  return (
    <div className="card">
      <img src={product.image || '/assets/product-placeholder.png'} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <div className="card-actions">
          <input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} />
          <button onClick={addWishlist}>Add</button>
        </div>
      </div>
    </div>
  )
}
