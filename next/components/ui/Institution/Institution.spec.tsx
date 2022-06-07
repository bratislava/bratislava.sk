import { render } from '@testing-library/react'

import { Institution } from './Institution'

describe('Institution', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Institution />)
    expect(baseElement).toBeTruthy()
  })
})
