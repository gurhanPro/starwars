import React from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import styles from './Search.module.css'

interface Character {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
}

interface SearchProps {
  searchTerm: string
  characters: Character[]
  loading: boolean
  error: string | null
  searchableLength: number
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectCharacter: (event: React.MouseEvent<HTMLLIElement>, character: Character) => void
  placeholder?: string
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  characters,
  loading,
  error,
  searchableLength,
  onSearchChange,
  onSelectCharacter,
  placeholder = "Search characters..."
}) => {
  return (
    <div className={styles.searchContainer} data-testid="search-container">
      <SearchInput 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder={placeholder}
      />
      <SearchResults 
        characters={characters}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        searchableLength={searchableLength}
        onSelectCharacter={onSelectCharacter}
      />
    </div>
  )
}

export default Search