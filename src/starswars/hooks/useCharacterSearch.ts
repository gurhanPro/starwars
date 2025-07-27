import { useQuery } from '@tanstack/react-query'

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

interface SearchResponse {
  results: Character[]
  count: number
  next: string | null
  previous: string | null
}

const fetchCharacters = async (searchTerm: string): Promise<Character[]> => {
  if (!searchTerm) {
    return []
  }
  
  const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch characters')
  }
  
  const data: SearchResponse = await response.json()
  return data.results
}

export const useCharacterSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['characters', searchTerm],
    queryFn: () => fetchCharacters(searchTerm),
    enabled: !!searchTerm,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => {
      const baseDelay = 500 * 2 ** attemptIndex
      const jitter = Math.random() * 0.1 * baseDelay // 10% jitter
      return Math.min(baseDelay + jitter, 10000)
    },
  })
}

export default useCharacterSearch