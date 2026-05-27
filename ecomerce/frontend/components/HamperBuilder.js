import { useEffect, useState } from 'react'
import axios from 'axios'

export default function HamperBuilder({ type='birthday' }){
  const [available, setAvailable] = useState([])
  const [selected, setSelected] = useState([])
  const [message, setMessage] = useState('')
  const [special, setSpecial] = useState('')
  const [theme, setTheme] = useState('classic')

  useEffect(()=>{
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/products')
      .then(r=>setAvailable(r.data)).catch(()=>setAvailable([]))
  },[])

  const add = (p)=>{
    setSelected(prev => {
      const exists = prev.find(x=>x.productId===p._id)
      if(exists) return prev.map(x=>x.productId===p._id?{...x,quantity:x.quantity+1}:x)
      return [...prev,{ productId: p._id, name: p.name, price: p.price, quantity: 1 }]
    })
  }

  const remove = (id)=> setSelected(prev=>prev.filter(x=>x.productId!==id))

  const saveHamper = async () =>{
    const payload = { type, title: `${type} custom`, items: selected, message, theme, specialInstructions: special, price: selected.reduce((s,i)=>s+i.price*i.quantity,0) }
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/hamper', payload)
    alert('Hamper saved')
  }

  return (
    <div className="hamper-builder">
      <h2>Build your {type} hamper</h2>
      <div className="builder-grid">
        <div>
          <h3>Products</h3>
          <div className="product-list">
            {available.map(p => (
              <div key={p._id} className="mini">
                <span>{p.name}</span>
                <button onClick={()=>add(p)}>Add</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Selected</h3>
          <div className="selected-list">
            {selected.map(s=> (
              <div key={s.productId} className="mini">
                <span>{s.name} x{s.quantity}</span>
                <button onClick={()=>remove(s.productId)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="options">
            <textarea placeholder="Add message/wishes" value={message} onChange={e=>setMessage(e.target.value)} />
            <input placeholder="Special instructions" value={special} onChange={e=>setSpecial(e.target.value)} />
            <select value={theme} onChange={e=>setTheme(e.target.value)}>
              <option value="classic">Classic</option>
              <option value="romantic">Romantic</option>
              <option value="vibrant">Vibrant</option>
            </select>
            <button onClick={saveHamper}>Save Hamper</button>
          </div>
        </div>
      </div>
    </div>
  )
}
