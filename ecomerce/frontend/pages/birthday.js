import { useEffect, useState } from 'react'
import axios from 'axios'
import HamperBuilder from '../components/HamperBuilder'

export default function Birthday() {
  const [templates, setTemplates] = useState([])
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/hamper/type/birthday')
      .then(r => setTemplates(r.data))
      .catch(() => setTemplates([]))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Birthday Hampers</h1>
        <p>Choose or build a bespoke birthday hamper.</p>
      </div>

      <div className="templates">
        {templates.map(t => (
          <div key={t._id} className="template-card">
            <img src={t.image || '/assets/birthday-card.png'} alt="hamper" />
            <h3>{t.title}</h3>
            <p>{t.message}</p>
          </div>
        ))}
      </div>

      <HamperBuilder type="birthday" />
    </div>
  )
}
