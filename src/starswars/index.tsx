import { useEffect, useState } from 'react'
import { SEARCHABLE_CHARACTER_LENGTH } from '../lib/constans'
import Search from './components/Search/Search'
import Character from './components/Character/Character'

function StarWars() {

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
    setSearchTerm('')
    setCharacters([])
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <Search 
        searchTerm={searchTerm}
        characters={characters}
        loading={loading}
        error={error}
        searchableLength={SEARCHABLE_CHARACTER_LENGTH}
        onSearchChange={handleSearchChange}
        onSelectCharacter={handleSelectCharacter}
        placeholder="Search characters..."
      />
      <Character 
        selectedCharacter={selectedCharacter}
      />
    </div>
  )
}

export default StarWars