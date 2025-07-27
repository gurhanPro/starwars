import React from 'react'
import styles from './Character.module.css'

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

interface CharacterProps {
  selectedCharacter: Character | null
}

const Character: React.FC<CharacterProps> = ({
  selectedCharacter
}) => {
  if (!selectedCharacter) {
    return (
      <div className={styles.placeholder} data-testid="character-placeholder">
        Select a character to see details
      </div>
    )
  }

  return (
    <div className={styles.characterCard} data-testid="character-card">
      <h2 className={styles.characterName} data-testid="character-name">{selectedCharacter.name}</h2>
      <div className={styles.characterDetails} data-testid="character-details">
        <p data-testid="character-height">Height: {selectedCharacter.height}</p>
        <p data-testid="character-mass">Mass: {selectedCharacter.mass}</p>
        <p data-testid="character-hair-color">Hair Color: {selectedCharacter.hair_color}</p>
        <p data-testid="character-skin-color">Skin Color: {selectedCharacter.skin_color}</p>
        <p data-testid="character-eye-color">Eye Color: {selectedCharacter.eye_color}</p>
        <p data-testid="character-birth-year">Birth Year: {selectedCharacter.birth_year}</p>
        <p data-testid="character-gender">Gender: {selectedCharacter.gender}</p>
      </div>
    </div>
  )
}

export default Character