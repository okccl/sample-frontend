import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_URL || "https://sample-backend.localhost"

function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/items`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError("アイテムの取得に失敗しました")
    }
  }

  const addItem = async () => {
    if (!name.trim()) return
    try {
      await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      setName("")
      fetchItems()
    } catch (e) {
      setError("アイテムの追加に失敗しました")
    }
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>sample-frontend</h1>
      <div style={{ marginBottom: 16 }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="アイテム名"
          style={{ marginRight: 8, padding: 4 }}
        />
        <button onClick={addItem}>追加</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}（{item.created_at}）</li>
        ))}
      </ul>
    </div>
  )
}

export default App
