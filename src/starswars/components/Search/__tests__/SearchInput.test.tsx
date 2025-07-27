import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchInput from '../SearchInput'

describe('SearchInput', () => {
  const mockOnSearchChange = vi.fn()

  beforeEach(() => {
    mockOnSearchChange.mockClear()
  })

  it('renders with default placeholder', () => {
    render(
      <SearchInput 
        searchTerm="" 
        onSearchChange={mockOnSearchChange} 
      />
    )
    
    expect(screen.getByPlaceholderText('Search characters...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(
      <SearchInput 
        searchTerm="" 
        onSearchChange={mockOnSearchChange} 
        placeholder="Custom placeholder"
      />
    )
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('displays the search term value', () => {
    render(
      <SearchInput 
        searchTerm="Luke" 
        onSearchChange={mockOnSearchChange} 
      />
    )
    
    const input = screen.getByDisplayValue('Luke')
    expect(input).toBeInTheDocument()
  })

  it('calls onSearchChange when input value changes', () => {
    render(
      <SearchInput 
        searchTerm="" 
        onSearchChange={mockOnSearchChange} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'Darth' } })
    
    expect(mockOnSearchChange).toHaveBeenCalledTimes(1)
    expect(mockOnSearchChange).toHaveBeenCalled()
  })

  it('has correct test id applied', () => {
    render(
      <SearchInput 
        searchTerm="" 
        onSearchChange={mockOnSearchChange} 
      />
    )
    
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })
})