import React from 'react'
import styles from './SearchResults.module.css'

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

interface SearchResultsProps {
  characters: Character[]
  loading: boolean
  error: string | null
  searchTerm: string
  searchableLength: number
  onSelectCharacter: (event: React.MouseEvent<HTMLLIElement>, character: Character) => void
}

const SearchResults: React.FC<SearchResultsProps> = ({
  characters,
  loading,
  error,
  searchTerm,
  searchableLength,
  onSelectCharacter
}) => {
  if (loading) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  if (!loading && characters.length === 0 && !error && searchTerm.length > searchableLength) {
    return (
      <div className={styles.searchResults}>
        <div className={styles.message}>No characters found.</div>
      </div>
    )
  }

  if (!loading && !error && characters.length > 0 && searchTerm.length > searchableLength) {
    return (
      <div className={styles.searchResults}>
        <ul className={styles.resultsList}>
          <li className={styles.resultsCount}>
            Found {characters.length} character(s).
          </li>
          {characters.map((character) => (
            <li 
              key={character.name} 
              className={styles.resultItem}
              onClick={(event) => onSelectCharacter(event, character)}
            >
              {character.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}

export default SearchResults