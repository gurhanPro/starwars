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
      <div className={styles.placeholder}>
        Select a character to see details
      </div>
    )
  }

  return (
    <div className={styles.characterCard}>
      <h2 className={styles.characterName}>{selectedCharacter.name}</h2>
      <div className={styles.characterDetails}>
        <p>Height: {selectedCharacter.height}</p>
        <p>Mass: {selectedCharacter.mass}</p>
        <p>Hair Color: {selectedCharacter.hair_color}</p>
        <p>Skin Color: {selectedCharacter.skin_color}</p>
        <p>Eye Color: {selectedCharacter.eye_color}</p>
        <p>Birth Year: {selectedCharacter.birth_year}</p>
        <p>Gender: {selectedCharacter.gender}</p>
      </div>
    </div>
  )
}

export default Character