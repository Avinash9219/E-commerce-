import { useEffect, useState } from 'react'
import axios from 'axios'
import HamperBuilder from '../components/HamperBuilder'

export default function Anniversary() {
  const [templates, setTemplates] = useState([])
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/hamper/type/anniversary')
      .then(r => setTemplates(r.data))
      .catch(() => setTemplates([]))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Anniversary Hampers</h1>
        <p>Create romantic hampers with bespoke touches.</p>
      </div>

      <div className="templates">
        {templates.map(t => (
          <div key={t._id} className="template-card">
            <img src={t.image || '/assets/anniversary-card.png'} alt="hamper" />
            <h3>{t.title}</h3>
            <p>{t.message}</p>
          </div>
        ))}
      </div>

      <HamperBuilder type="anniversary" />
    </div>
  )
}
