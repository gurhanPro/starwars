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
      <div className={styles.searchResults} data-testid="search-results">
        <div className={styles.loading} data-testid="loading-message">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.searchResults} data-testid="search-results">
        <div className={styles.error} data-testid="error-message">{error}</div>
      </div>
    )
  }

  if (!loading && characters.length === 0 && !error && searchTerm.length > searchableLength) {
    return (
      <div className={styles.searchResults} data-testid="search-results">
        <div className={styles.message} data-testid="no-results-message">No characters found.</div>
      </div>
    )
  }

  if (!loading && !error && characters.length > 0 && searchTerm.length > searchableLength) {
    return (
      <div className={styles.searchResults} data-testid="search-results">
        <ul className={styles.resultsList} data-testid="results-list">
          <li className={styles.resultsCount} data-testid="results-count">
            Found {characters.length} character(s).
          </li>
          {characters.map((character) => (
            <li 
              key={character.name} 
              className={styles.resultItem}
              data-testid={`character-item-${character.name}`}
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