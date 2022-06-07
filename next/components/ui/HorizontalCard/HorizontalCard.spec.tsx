import { render } from '@testing-library/react'

import HorizontalCard from './HorizontalCard'

describe('HorizontalCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HorizontalCard />)
    expect(baseElement).toBeTruthy()
  })
})
