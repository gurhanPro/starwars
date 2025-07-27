import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Character from '../Character'

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male'
}

describe('Character', () => {
  it('displays null when no character is selected', () => {
    render(<Character selectedCharacter={null} />)
    expect(screen.queryByTestId('character-card')).not.toBeInTheDocument()
  })

  it('does not display character card when no character is selected', () => {
    render(<Character selectedCharacter={null} />)
    
    expect(screen.queryByTestId('character-card')).not.toBeInTheDocument()
    expect(screen.queryByTestId('character-name')).not.toBeInTheDocument()
  })

  it('displays character card when character is selected', () => {
    render(<Character selectedCharacter={mockCharacter} />)
    
    expect(screen.getByTestId('character-card')).toBeInTheDocument()
    expect(screen.getByTestId('character-name')).toBeInTheDocument()
    expect(screen.getByTestId('character-details')).toBeInTheDocument()
  })

  it('displays character name correctly', () => {
    render(<Character selectedCharacter={mockCharacter} />)
    
    expect(screen.getByTestId('character-name')).toHaveTextContent('Luke Skywalker')
  })

  it('displays all character details with correct values', () => {
    render(<Character selectedCharacter={mockCharacter} />)
    
    expect(screen.getByTestId('character-height')).toHaveTextContent('Height: 172')
    expect(screen.getByTestId('character-mass')).toHaveTextContent('Mass: 77')
    expect(screen.getByTestId('character-hair-color')).toHaveTextContent('Hair Color: blond')
    expect(screen.getByTestId('character-skin-color')).toHaveTextContent('Skin Color: fair')
    expect(screen.getByTestId('character-eye-color')).toHaveTextContent('Eye Color: blue')
    expect(screen.getByTestId('character-birth-year')).toHaveTextContent('Birth Year: 19BBY')
    expect(screen.getByTestId('character-gender')).toHaveTextContent('Gender: male')
  })

  it('handles character with different properties', () => {
    const darthVader = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      skin_color: 'white',
      eye_color: 'yellow',
      birth_year: '41.9BBY',
      gender: 'male'
    }

    render(<Character selectedCharacter={darthVader} />)
    
    expect(screen.getByTestId('character-name')).toHaveTextContent('Darth Vader')
    expect(screen.getByTestId('character-height')).toHaveTextContent('Height: 202')
    expect(screen.getByTestId('character-mass')).toHaveTextContent('Mass: 136')
    expect(screen.getByTestId('character-hair-color')).toHaveTextContent('Hair Color: none')
    expect(screen.getByTestId('character-skin-color')).toHaveTextContent('Skin Color: white')
    expect(screen.getByTestId('character-eye-color')).toHaveTextContent('Eye Color: yellow')
    expect(screen.getByTestId('character-birth-year')).toHaveTextContent('Birth Year: 41.9BBY')
    expect(screen.getByTestId('character-gender')).toHaveTextContent('Gender: male')
  })

  it('handles character with unknown values', () => {
    const unknownCharacter = {
      name: 'Unknown Character',
      height: 'unknown',
      mass: 'unknown',
      hair_color: 'n/a',
      skin_color: 'n/a',
      eye_color: 'n/a',
      birth_year: 'unknown',
      gender: 'n/a'
    }

    render(<Character selectedCharacter={unknownCharacter} />)
    
    expect(screen.getByTestId('character-name')).toHaveTextContent('Unknown Character')
    expect(screen.getByTestId('character-height')).toHaveTextContent('Height: unknown')
    expect(screen.getByTestId('character-mass')).toHaveTextContent('Mass: unknown')
    expect(screen.getByTestId('character-hair-color')).toHaveTextContent('Hair Color: n/a')
    expect(screen.getByTestId('character-skin-color')).toHaveTextContent('Skin Color: n/a')
    expect(screen.getByTestId('character-eye-color')).toHaveTextContent('Eye Color: n/a')
    expect(screen.getByTestId('character-birth-year')).toHaveTextContent('Birth Year: unknown')
    expect(screen.getByTestId('character-gender')).toHaveTextContent('Gender: n/a')
  })

  it('has correct test ids for all elements', () => {
    render(<Character selectedCharacter={mockCharacter} />)
    
    // Verify all test ids are present
    expect(screen.getByTestId('character-card')).toBeInTheDocument()
    expect(screen.getByTestId('character-name')).toBeInTheDocument()
    expect(screen.getByTestId('character-details')).toBeInTheDocument()
    expect(screen.getByTestId('character-height')).toBeInTheDocument()
    expect(screen.getByTestId('character-mass')).toBeInTheDocument()
    expect(screen.getByTestId('character-hair-color')).toBeInTheDocument()
    expect(screen.getByTestId('character-skin-color')).toBeInTheDocument()
    expect(screen.getByTestId('character-eye-color')).toBeInTheDocument()
    expect(screen.getByTestId('character-birth-year')).toBeInTheDocument()
    expect(screen.getByTestId('character-gender')).toBeInTheDocument()
  })
})