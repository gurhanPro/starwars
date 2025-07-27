import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchResults from '../SearchResults'

const mockCharacters = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male'
  },
  {
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male'
  }
]

describe('SearchResults', () => {
  const mockOnSelectCharacter = vi.fn()
  const defaultProps = {
    characters: [],
    loading: false,
    error: null,
    searchTerm: '',
    searchableLength: 2,
    onSelectCharacter: mockOnSelectCharacter
  }

  beforeEach(() => {
    mockOnSelectCharacter.mockClear()
  })

  it('displays loading state', () => {
    render(
      <SearchResults 
        {...defaultProps}
        loading={true}
      />
    )
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error state', () => {
    render(
      <SearchResults 
        {...defaultProps}
        error="Failed to fetch characters"
      />
    )
    
    expect(screen.getByText('Failed to fetch characters')).toBeInTheDocument()
  })

  it('displays no characters found message', () => {
    render(
      <SearchResults 
        {...defaultProps}
        searchTerm="xyz"
        characters={[]}
      />
    )
    
    expect(screen.getByText('No characters found.')).toBeInTheDocument()
  })

  it('displays characters list when results are available', () => {
    render(
      <SearchResults 
        {...defaultProps}
        searchTerm="Luke"
        characters={mockCharacters}
      />
    )
    
    expect(screen.getByText('Found 2 character(s).')).toBeInTheDocument()
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('Darth Vader')).toBeInTheDocument()
  })

  it('calls onSelectCharacter when character is clicked', () => {
    render(
      <SearchResults 
        {...defaultProps}
        searchTerm="Luke"
        characters={mockCharacters}
      />
    )
    
    const lukeItem = screen.getByTestId('character-item-Luke Skywalker')
    fireEvent.click(lukeItem)
    
    expect(mockOnSelectCharacter).toHaveBeenCalledTimes(1)
    expect(mockOnSelectCharacter).toHaveBeenCalledWith(
      expect.any(Object),
      mockCharacters[0]
    )
  })

  it('does not display results when search term is too short', () => {
    render(
      <SearchResults 
        {...defaultProps}
        searchTerm="L"
        characters={mockCharacters}
        searchableLength={2}
      />
    )
    
    expect(screen.queryByText('Found 2 character(s).')).not.toBeInTheDocument()
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument()
  })

  it('returns null when no conditions are met', () => {
    const { container } = render(
      <SearchResults 
        {...defaultProps}
        searchTerm="L"
        searchableLength={2}
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('has correct test ids applied', () => {
    render(
      <SearchResults 
        {...defaultProps}
        loading={true}
      />
    )
    
    expect(screen.getByTestId('loading-message')).toBeInTheDocument()
    expect(screen.getByTestId('search-results')).toBeInTheDocument()
  })
})