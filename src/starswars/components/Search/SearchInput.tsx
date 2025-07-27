import React from 'react'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  searchTerm: string
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search characters..."
}) => {
  return (
    <input
      type="text"
      value={searchTerm}
      placeholder={placeholder}
      onChange={onSearchChange}
      className={styles.searchInput}
    />
  )
}

export default SearchInput