import { useEffect, useState } from 'react'
import './App.css'
import { SEARCHABLE_CHARACTER_LENGTH } from './lib/constans'

function App() {

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null)

  const fetchCharacters = async () => {
      if (!searchTerm) {
        setCharacters([])
        return
      }
      setError(null)
      try {
        setLoading(true)
        const response = await fetch('https://swapi.dev/api/people/?search=' + searchTerm)
        const data = await response.json()
        setCharacters(data.results)
      } catch (error) {
        setError('Failed to fetch characters')
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    if (searchTerm && searchTerm.length > SEARCHABLE_CHARACTER_LENGTH) {
      fetchCharacters()
    }
  }, [searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setSelectedCharacter(null)
  }

  const handleSelectCharacter = (event: React.MouseEvent<HTMLLIElement>, character: any) => {
    event.preventDefault()
    setSelectedCharacter(character)
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
      {!loading && characters.length === 0 && !error && <p>No characters found.</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && characters.length > 0 && searchTerm.length > SEARCHABLE_CHARACTER_LENGTH && (
       <> 
       <p>Found {characters.length} character(s).</p>
        <ul>
          {characters.map((character) => (
            <li key={character.name} onClick={(event) => handleSelectCharacter(event, character)}>{character.name}</li>
          ))}
        </ul>
        </>
      )}
      <div>
        {
          selectedCharacter && (
            <div>
              <h2>{selectedCharacter.name}</h2>
              <p>Height: {selectedCharacter.height}</p>
              <p>Mass: {selectedCharacter.mass}</p>
              <p>Hair Color: {selectedCharacter.hair_color}</p>
              <p>Skin Color: {selectedCharacter.skin_color}</p>
              <p>Eye Color: {selectedCharacter.eye_color}</p>
              <p>Birth Year: {selectedCharacter.birth_year}</p>
              <p>Gender: {selectedCharacter.gender}</p>
            </div>
          )

        }
      </div>
    </div>
  )
}
export default App
