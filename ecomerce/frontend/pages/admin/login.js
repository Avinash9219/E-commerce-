import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

export default function AdminLogin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/users/login', { email, password })
      localStorage.setItem('token', res.data.token)
      Router.push('/admin/dashboard')
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={submit} className="login-form">
        <h2>Admin Login</h2>
        {error && <div className="toast error">{error}</div>}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
