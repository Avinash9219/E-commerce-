import { useState } from 'react'
import axios from 'axios'

export default function CheckoutForm(){
  const [form, setForm] = useState({ fullName:'', mobile:'', altMobile:'', address:'', city:'', state:'', pincode:'', deliveryDate:'', notes:'' })
  const [loading, setLoading] = useState(false)
  const onChange = (k,v)=> setForm(f=>({...f,[k]:v}))

  const validate = ()=>{
    if(!form.fullName) return 'Full name required'
    if(!/^\d{10}$/.test(form.mobile)) return 'Mobile must be 10 digits'
    if(!form.address) return 'Address required'
    if(!form.city) return 'City required'
    if(!form.state) return 'State required'
    if(!/^[0-9]{6}$/.test(form.pincode)) return 'Pincode invalid'
    return null
  }

  const submit = async (e)=>{
    e.preventDefault()
    const err = validate()
    if(err) return alert(err)
    setLoading(true)
    try{
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      const orderPayload = { userId: null, items: wishlist, total: wishlist.reduce((s,i)=>s+i.price*i.quantity,0), shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`, specialNotes: form.notes, deliveryDate: form.deliveryDate, customer: form }
      await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/orders', orderPayload)
      alert('Order placed — we will contact you soon')
      localStorage.removeItem('wishlist')
    }catch(err){
      alert('Order failed')
    }finally{ setLoading(false) }
  }

  return (
    <form className="checkout-form" onSubmit={submit}>
      <input placeholder="Full Name" value={form.fullName} onChange={e=>onChange('fullName', e.target.value)} />
      <input placeholder="Mobile Number" value={form.mobile} onChange={e=>onChange('mobile', e.target.value)} />
      <input placeholder="Alternate Number (optional)" value={form.altMobile} onChange={e=>onChange('altMobile', e.target.value)} />
      <textarea placeholder="Full Delivery Address" value={form.address} onChange={e=>onChange('address', e.target.value)} />
      <input placeholder="City" value={form.city} onChange={e=>onChange('city', e.target.value)} />
      <input placeholder="State" value={form.state} onChange={e=>onChange('state', e.target.value)} />
      <input placeholder="Pincode" value={form.pincode} onChange={e=>onChange('pincode', e.target.value)} />
      <input type="date" placeholder="Delivery Date" value={form.deliveryDate} onChange={e=>onChange('deliveryDate', e.target.value)} />
      <textarea placeholder="Special Notes" value={form.notes} onChange={e=>onChange('notes', e.target.value)} />
      <button type="submit" disabled={loading}>{loading? 'Placing...':'Place Order'}</button>
    </form>
  )
}
