import { render } from '@testing-library/react'

import DiagramCard from './DiagramCard'

describe('TicketBuyDiagramCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiagramCard />)
    expect(baseElement).toBeTruthy()
  })
})
