import { render } from '@testing-library/react'

import Gallery from './Gallery'

describe('Gallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Gallery />)
    expect(baseElement).toBeTruthy()
  })
})
