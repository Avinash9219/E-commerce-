import { useEffect, useState } from 'react'
import AdminProductList from '../../components/AdminProductList'
import AdminHamperList from '../../components/AdminHamperList'

export default function AdminContent(){
  const [tab, setTab] = useState('products')

  return (
    <div className="admin-content">
      <header className="admin-top">
        <h1>Admin — Content Manager</h1>
        <div className="admin-actions">
          <button className={`tab-btn ${tab==='products'?'active':''}`} onClick={()=>setTab('products')}>Products</button>
          <button className={`tab-btn ${tab==='hampers'?'active':''}`} onClick={()=>setTab('hampers')}>Hampers</button>
          <button className={`tab-btn ${tab==='orders'?'active':''}`} onClick={()=>setTab('orders')}>Orders</button>
          <button className={`tab-btn ${tab==='users'?'active':''}`} onClick={()=>setTab('users')}>Users</button>
        </div>
      </header>

      <section className="admin-body">
        {tab==='products' && <AdminProductList />}
        {tab==='hampers' && <AdminHamperList />}
        {tab==='orders' && <div className="panel">Orders management coming soon</div>}
        {tab==='users' && <div className="panel">User management coming soon</div>}
      </section>
    </div>
  )
}
