import { render } from '@testing-library/react'

import { InBa } from './InBa'

describe('InBa', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InBa />)
    expect(baseElement).toBeTruthy()
  })
})
