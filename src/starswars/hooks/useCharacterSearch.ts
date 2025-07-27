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
    retryDelay: (attemptIndex) => Math.min(500 * 2 ** attemptIndex, 10000), // double the delay each retry, max 10 seconds
  })
}

export default useCharacterSearch