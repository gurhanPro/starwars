import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ErrorBoundary from '../ErrorBoundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('ErrorBoundary', () => {
  afterEach(() => {
    consoleSpy.mockClear()
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-component">Child content</div>
      </ErrorBoundary>
    )

    expect(screen.getByTestId('child-component')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('should render error fallback when child component throws error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText("We're sorry, but something unexpected happened.")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('should reset error state when "Try again" button is clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })


})