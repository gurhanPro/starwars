import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCharacters = async () => {
      setLoading(true)
      const response = await fetch('https://swapi.dev/api/people/?search=' + searchTerm)
      const data = await response.json()
      setCharacters(data.results)
      setLoading(false)
  }

  useEffect(() => {
    if (searchTerm) {
      fetchCharacters()
    }
  }, [searchTerm])

  console.log(characters)

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
      {loading && <p>Loading...</p>}
      {!loading && characters.length === 0 && <p>No characters found.</p>}
      {!loading && characters.length > 0 && (
        <p>Found {characters.length} character(s).</p>
      )}
      {!loading && characters.length > 0 && (
        <ul>
          {characters.map((character) => (
            <li key={character.name}>{character.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default App
