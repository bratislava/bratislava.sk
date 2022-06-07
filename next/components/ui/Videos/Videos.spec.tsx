import { render } from '@testing-library/react'

import Videos from './Videos'

describe('Videos', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Videos />)
    expect(baseElement).toBeTruthy()
  })
})
