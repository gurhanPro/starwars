import { useState } from 'react'
import './App.css'

function App() {

  const [searchTerm, setSearchTerm] = useState('')  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        onChange={handleSearchChange}
      />
    </div>
  )
}
export default App
