import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminHamperForm from './AdminHamperForm'

export default function AdminHamperList(){
  const [hampers, setHampers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('birthday')
  const [editing, setEditing] = useState(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetch = ()=>{
    setLoading(true)
    axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/hamper/type/${filter}`)
      .then(r=>setHampers(r.data))
      .catch(()=>setHampers([]))
      .finally(()=>setLoading(false))
  }
  useEffect(()=>{ fetch() }, [filter])

  const remove = async (id)=>{
    if(!confirm('Delete this hamper?')) return
    try{
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/hamper/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      fetch()
      alert('Deleted')
    }catch(err){ alert('Delete failed') }
  }

  return (
    <div className="admin-hampers panel">
      <div className="panel-head">
        <h2>Hampers</h2>
        <div className="hamper-controls">
          <button className={`tab-btn ${filter==='birthday'?'active':''}`} onClick={()=>setFilter('birthday')}>Birthday</button>
          <button className={`tab-btn ${filter==='anniversary'?'active':''}`} onClick={()=>setFilter('anniversary')}>Anniversary</button>
          <button onClick={()=>setEditing({})} className="primary">+ New Template</button>
          <button onClick={fetch} className="muted">Refresh</button>
        </div>
      </div>

      <div className="hamper-list">
        {loading ? <p>Loading...</p> : (
          hampers.length ? hampers.map(h=> (
            <div key={h._id} className="hamper-row">
              <img src={h.image || '/assets/birthday-card.png'} alt="img" />
              <div className="hamper-info">
                <div className="hamper-title">{h.title}</div>
                <div className="hamper-msg">{h.message}</div>
                <div className="hamper-meta">{h.type.toUpperCase()} • ₹{h.price || 0}</div>
              </div>
              <div className="hamper-actions">
                <button onClick={()=>setEditing(h)}>Edit</button>
                <button onClick={()=>remove(h._id)} className="danger">Delete</button>
              </div>
            </div>
          )) : <p>No templates found</p>
        )}
      </div>

      {editing !== null && (
        <div className="drawer">
          <AdminHamperForm hamper={editing} onClose={()=>{ setEditing(null); fetch() }} />
        </div>
      )}
    </div>
  )
}
