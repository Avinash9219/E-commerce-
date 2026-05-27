import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminProductForm({ product={}, onClose }){
  const [form, setForm] = useState({ name:'', category:'', price:'', description:'', image:'' })
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(()=>{
    if(product && product._id){
      setForm({ name: product.name||'', category: product.category||'', price: product.price||'', description: product.description||'', image: product.image||'' })
      setPreview(product.image||'')
    } else {
      setForm({ name:'', category:'', price:'', description:'', image:'' }); setPreview('')
    }
  },[product])

  const onFile = async (e)=>{
    const file = e.target.files[0]
    if(!file) return
    const fd = new FormData(); fd.append('image', file)
    try{
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/upload', fd, { headers: { 'Content-Type':'multipart/form-data', Authorization: `Bearer ${token}` } })
      setForm(f=>({...f, image: res.data.path}))
      setPreview(res.data.path)
    }catch(err){ alert('Upload failed') }
  }

  const save = async (e)=>{
    e.preventDefault(); setSaving(true)
    try{
      if(product && product._id){
        await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/products/${product._id}`, form, { headers: { Authorization: `Bearer ${token}` } })
        alert('Updated')
      } else {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/products', form, { headers: { Authorization: `Bearer ${token}` } })
        alert('Created')
      }
      onClose()
    }catch(err){ alert('Save failed') }
    finally{ setSaving(false) }
  }

  return (
    <form className="admin-form" onSubmit={save}>
      <div className="form-row">
        <label>Name</label>
        <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
      </div>
      <div className="form-row">
        <label>Category</label>
        <input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} />
      </div>
      <div className="form-row">
        <label>Price</label>
        <input type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} required />
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
      </div>

      <div className="form-row">
        <label>Image</label>
        <input type="file" accept="image/*" onChange={onFile} />
        {preview && <img src={preview} className="preview" alt="preview" />}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="muted">Cancel</button>
        <button type="submit" className="primary" disabled={saving}>{saving? 'Saving...':'Save'}</button>
      </div>
    </form>
  )
}
