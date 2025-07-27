import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Search from '../Search'

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
  }
]

describe('Search', () => {
  const mockOnSearchChange = vi.fn()
  const mockOnSelectCharacter = vi.fn()
  
  const defaultProps = {
    searchTerm: '',
    characters: [],
    loading: false,
    error: null,
    searchableLength: 2,
    onSearchChange: mockOnSearchChange,
    onSelectCharacter: mockOnSelectCharacter
  }

  beforeEach(() => {
    mockOnSearchChange.mockClear()
    mockOnSelectCharacter.mockClear()
  })

  it('renders both SearchInput and SearchResults components', () => {
    render(<Search {...defaultProps} />)
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(
      <Search 
        {...defaultProps} 
        placeholder="Find a character..."
      />
    )
    
    expect(screen.getByPlaceholderText('Find a character...')).toBeInTheDocument()
  })

  it('passes search term to SearchInput', () => {
    render(
      <Search 
        {...defaultProps} 
        searchTerm="Luke"
      />
    )
    
    expect(screen.getByDisplayValue('Luke')).toBeInTheDocument()
  })

  it('displays loading state through SearchResults', () => {
    render(
      <Search 
        {...defaultProps} 
        loading={true}
      />
    )
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays error state through SearchResults', () => {
    render(
      <Search 
        {...defaultProps} 
        error="Network error"
      />
    )
    
    expect(screen.getByText('Network error')).toBeInTheDocument()
  })

  it('displays characters through SearchResults', () => {
    render(
      <Search 
        {...defaultProps} 
        searchTerm="Luke"
        characters={mockCharacters}
      />
    )
    
    expect(screen.getByText('Found 1 character(s).')).toBeInTheDocument()
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  })

  it('forwards onSearchChange events from SearchInput', () => {
    render(<Search {...defaultProps} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Vader' } })
    
    expect(mockOnSearchChange).toHaveBeenCalledTimes(1)
  })

  it('forwards onSelectCharacter events from SearchResults', () => {
    render(
      <Search 
        {...defaultProps} 
        searchTerm="Luke"
        characters={mockCharacters}
      />
    )
    
    const characterItem = screen.getByText('Luke Skywalker')
    fireEvent.click(characterItem)
    
    expect(mockOnSelectCharacter).toHaveBeenCalledTimes(1)
    expect(mockOnSelectCharacter).toHaveBeenCalledWith(
      expect.any(Object),
      mockCharacters[0]
    )
  })

  it('has correct test id applied', () => {
    render(<Search {...defaultProps} />)
    
    expect(screen.getByTestId('search-container')).toBeInTheDocument()
  })

  it('integrates SearchInput and SearchResults properly', () => {
    render(
      <Search 
        {...defaultProps} 
        searchTerm="test"
        characters={mockCharacters}
        loading={false}
        error={null}
      />
    )
    
    // Both components should be present and functional
    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  })
})