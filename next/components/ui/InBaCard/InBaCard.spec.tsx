import { render } from '@testing-library/react'

import InBaCard from './InBaCard'

describe('InBaCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InBaCard />)
    expect(baseElement).toBeTruthy()
  })
})
