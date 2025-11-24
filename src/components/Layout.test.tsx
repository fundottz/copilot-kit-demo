import { render, screen } from '@testing-library/react'
import Layout from './Layout'

describe('Layout Component', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct background styling', () => {
    const { container } = render(
      <Layout>
        <div>Test</div>
      </Layout>
    )
    const layoutDiv = container.firstChild as HTMLElement
    expect(layoutDiv).toHaveClass('min-h-screen', 'bg-gray-50')
  })
})
