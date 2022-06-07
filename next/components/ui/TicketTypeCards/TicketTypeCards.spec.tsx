import { render } from '@testing-library/react'

import TicketTypeCards from './TicketTypeCards'

describe('TicketTypeCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketTypeCards />)
    expect(baseElement).toBeTruthy()
  })
})
