import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminProductForm from './AdminProductForm'

export default function AdminProductList(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetch = ()=>{
    setLoading(true)
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products')
      .then(r=>setProducts(r.data))
      .catch(()=>setProducts([]))
      .finally(()=>setLoading(false))
  }

  useEffect(()=>{ fetch() }, [])

  const remove = async (id)=>{
    if(!confirm('Delete this product?')) return
    try{
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      fetch()
      alert('Deleted')
    }catch(err){ alert('Delete failed') }
  }

  return (
    <div className="admin-products panel">
      <div className="panel-head">
        <h2>Products</h2>
        <div>
          <button onClick={()=>setEditing({})} className="primary">+ New Product</button>
          <button onClick={fetch} className="muted">Refresh</button>
        </div>
      </div>

      <div className="product-table">
        {loading ? <p>Loading...</p> : (
          products.length ? products.map(p=> (
            <div className="prod-row" key={p._id}>
              <div className="prod-info">
                <img src={p.image || '/assets/product-placeholder.png'} alt="img" />
                <div>
                  <div className="prod-name">{p.name}</div>
                  <div className="prod-cat">{p.category}</div>
                </div>
              </div>
              <div className="prod-actions">
                <button onClick={()=>setEditing(p)}>Edit</button>
                <button onClick={()=>remove(p._id)} className="danger">Delete</button>
              </div>
            </div>
          )) : <p>No products found</p>
        )}
      </div>

      {editing !== null && (
        <div className="drawer">
          <AdminProductForm product={editing} onClose={()=>{ setEditing(null); fetch() }} />
        </div>
      )}
    </div>
  )
}
