import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminDashboard(){
  const [stats, setStats] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/analytics/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setStats(r.data)).catch(()=>{})
  },[])

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-links">
        <a href="/admin/content" className="card-link">Manage Content</a>
        <a href="/admin/products" className="card-link">Products (legacy)</a>
        <a href="/admin/hamper" className="card-link">Hampers (legacy)</a>
      </div>
      {stats ? (
        <div className="stats-grid">
          <div>Total Products: {stats.totalProducts}</div>
          <div>Total Users: {stats.totalUsers}</div>
          <div>Total Orders: {stats.totalOrders}</div>
          <div>Total Revenue: ₹{stats.totalRevenue}</div>
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
