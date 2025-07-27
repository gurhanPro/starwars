import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StarWars from './starswars'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StarWars />
    </QueryClientProvider>
  )
}

export default App
