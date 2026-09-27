import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb'

function renderBreadcrumb(items: BreadcrumbItem[] | null | undefined) {
  return render(
    <MemoryRouter>
      <Breadcrumb items={items as BreadcrumbItem[]} />
    </MemoryRouter>,
  )
}

describe('Breadcrumb empty and invalid item collections', () => {
  it('renders nothing when items are missing', () => {
    const { container } = renderBreadcrumb(undefined)

    expect(container.firstChild).toBeNull()
    expect(screen.queryByRole('navigation', { name: 'Breadcrumb' })).not.toBeInTheDocument()
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull()
  })

  it('renders nothing when items are null at runtime', () => {
    const { container } = renderBreadcrumb(null)

    expect(container.firstChild).toBeNull()
  })

  it('renders nothing for an empty item list', () => {
    const { container } = renderBreadcrumb([])

    expect(container.firstChild).toBeNull()
  })

  it('renders a valid breadcrumb list normally', () => {
    renderBreadcrumb([
      { label: 'Home', href: '/' },
      { label: 'Details' },
    ])

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByText('Details')).toHaveAttribute('aria-current', 'page')
  })
})
