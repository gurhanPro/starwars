import { useState } from 'react'
import { SEARCHABLE_CHARACTER_LENGTH, DEBOUNCE_TIME_IN_MS } from '../lib/constans'
import Search from './components/Search/Search'
import Character from './components/Character/Character'
import useDebounce from './hooks/useDebounce'
import useCharacterSearch from './hooks/useCharacterSearch'

function StarWars() {

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_TIME_IN_MS)
  
  const shouldSearch = debouncedSearchTerm && debouncedSearchTerm.length > SEARCHABLE_CHARACTER_LENGTH
  const searchQuery = shouldSearch ? debouncedSearchTerm : ''
  
  const { data: characters = [], isLoading: loading, error } = useCharacterSearch(searchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setSelectedCharacter(null)
  }

  const handleSelectCharacter = (event: React.MouseEvent<HTMLLIElement>, character: any) => {
    event.preventDefault()
    setSelectedCharacter(character)
    setSearchTerm('')
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <Search 
        searchTerm={searchTerm}
        characters={characters}
        loading={loading}
        error={error?.message || null}
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