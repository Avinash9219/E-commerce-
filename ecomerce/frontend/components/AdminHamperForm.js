import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminHamperForm({ hamper={}, onClose }){
  const [form, setForm] = useState({
    type: 'birthday',
    title: '',
    message: '',
    theme: 'classic',
    color: '#d86cff',
    specialInstructions: '',
    image: '',
    items: [],
  })
  const [preview, setPreview] = useState('')
  const [products, setProducts] = useState([])
  const [saving, setSaving] = useState(false)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(()=>{
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products')
      .then(r=>setProducts(r.data))
      .catch(()=>setProducts([]))
  }, [])

  useEffect(()=>{
    if(hamper && hamper._id){
      setForm({
        type: hamper.type || 'birthday',
        title: hamper.title || '',
        message: hamper.message || '',
        theme: hamper.theme || 'classic',
        color: hamper.color || '#d86cff',
        specialInstructions: hamper.specialInstructions || '',
        image: hamper.image || '',
        items: hamper.items || [],
      })
      setPreview(hamper.image || '')
    } else {
      setForm({ type:'birthday', title:'', message:'', theme:'classic', color:'#d86cff', specialInstructions:'', image:'', items: [] })
      setPreview('')
    }
  }, [hamper])

  const uploadImage = async (e)=>{
    const file = e.target.files[0]
    if(!file) return
    const data = new FormData()
    data.append('image', file)
    try{
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      })
      setForm(f=>({...f, image: res.data.path}))
      setPreview(res.data.path)
    }catch(err){
      alert('Image upload failed')
    }
  }

  const addItem = (product)=>{
    setForm(prev=>{
      const existing = prev.items.find(i=>i.productId===product._id)
      if(existing){
        return {
          ...prev,
          items: prev.items.map(i=>i.productId===product._id ? {...i, quantity: i.quantity + 1} : i)
        }
      }
      return {
        ...prev,
        items: [...prev.items, { productId: product._id, name: product.name, price: product.price, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id, value)=>{
    setForm(prev => ({
      ...prev,
      items: prev.items.map(item => item.productId===id ? {...item, quantity: Number(value)} : item)
    }))
  }

  const removeItem = (id)=>{
    setForm(prev => ({
      ...prev,
      items: prev.items.filter(item => item.productId !== id)
    }))
  }

  const save = async (e)=>{
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      price: form.items.reduce((sum,item)=>sum + item.price * item.quantity, 0)
    }
    try{
      if(hamper && hamper._id){
        await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/hamper/${hamper._id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
        alert('Hamper updated successfully')
      } else {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/hamper', payload, { headers: { Authorization: `Bearer ${token}` } })
        alert('New hamper created successfully')
      }
      onClose()
    }catch(err){
      alert('Save failed. Please check your values.')
    }finally{
      setSaving(false)
    }
  }

  return (
    <form className="admin-form admin-hamper-form" onSubmit={save}>
      <div className="form-row double">
        <div>
          <label>Hamper Type</label>
          <select value={form.type} onChange={e=>setForm(f=>({...f, type:e.target.value}))}>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </div>
        <div>
          <label>Title</label>
          <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required />
        </div>
      </div>

      <div className="form-row">
        <label>Message</label>
        <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Romantic notes, birthday wishes, or gift theme." />
      </div>

      <div className="form-row double">
        <div>
          <label>Theme</label>
          <select value={form.theme} onChange={e=>setForm(f=>({...f,theme:e.target.value}))}>
            <option value="classic">Classic</option>
            <option value="romantic">Romantic</option>
            <option value="vibrant">Vibrant</option>
            <option value="elegant">Elegant</option>
          </select>
        </div>
        <div>
          <label>Accent Color</label>
          <input type="color" value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))} />
        </div>
      </div>

      <div className="form-row">
        <label>Special Instructions</label>
        <textarea value={form.specialInstructions} onChange={e=>setForm(f=>({...f,specialInstructions:e.target.value}))} />
      </div>

      <div className="form-row file-row">
        <label>Image</label>
        <input type="file" accept="image/*" onChange={uploadImage} />
        {preview && <img src={preview} alt="preview" className="preview" />}
      </div>

      <div className="form-row">
        <label>Pick Products</label>
        <div className="product-picker">
          {products.map(prod => (
            <button type="button" key={prod._id} className="item-chip" onClick={()=>addItem(prod)}>
              {prod.name} +
            </button>
          ))}
        </div>
      </div>

      <div className="form-row">
        <label>Selected Items</label>
        <div className="items-list">
          {form.items.length ? form.items.map(item => (
            <div className="item-row" key={item.productId}>
              <div>
                <strong>{item.name}</strong>
                <p>₹{item.price} x</p>
              </div>
              <div className="item-controls">
                <input type="number" min="1" value={item.quantity} onChange={e=>updateQuantity(item.productId, e.target.value)} />
                <button type="button" className="danger" onClick={()=>removeItem(item.productId)}>Remove</button>
              </div>
            </div>
          )) : <p className="empty-note">No items added yet. Tap on a product above.</p>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="muted" onClick={onClose}>Cancel</button>
        <button type="submit" className="primary" disabled={saving}>{saving ? 'Saving...' : 'Save Hamper'}</button>
      </div>
    </form>
  )
}
