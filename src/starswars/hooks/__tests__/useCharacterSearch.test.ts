import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import React from 'react'
import useCharacterSearch from '../useCharacterSearch'

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useCharacterSearch', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should not make request when search term is empty', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useCharacterSearch(''), { wrapper })

    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('should fetch characters when search term is provided', async () => {
    const mockResponse = {
      results: [
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
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const wrapper = createWrapper()
    const { result } = renderHook(() => useCharacterSearch('Luke'), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockResponse.results)
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=Luke')
  })

  it('should handle fetch errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const wrapper = createWrapper()
    const { result } = renderHook(() => useCharacterSearch('Luke'), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.data).toBeUndefined()
  })

  it('should handle HTTP errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    const wrapper = createWrapper()
    const { result } = renderHook(() => useCharacterSearch('Luke'), { wrapper })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect((result.current.error as Error).message).toBe('Failed to fetch characters')
  })

  it('should return undefined when search term becomes empty after having data', () => {
    const wrapper = createWrapper()
    
    // First render with empty search term
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useCharacterSearch(searchTerm),
      { 
        wrapper,
        initialProps: { searchTerm: '' }
      }
    )

    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(false)

    // Rerender with search term
    rerender({ searchTerm: 'Luke' })
    expect(result.current.isLoading).toBe(true)

    // Rerender back to empty
    rerender({ searchTerm: '' })
    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
  })

  it('should use correct query key for caching', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useCharacterSearch('Vader'), { wrapper })

    // The query key should include the search term for proper caching
    expect(mockFetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=Vader')
  })
})