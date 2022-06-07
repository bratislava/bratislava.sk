import { render } from '@testing-library/react'

import { Brand } from './Brand'

describe('Brand', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Brand />)
    expect(baseElement).toBeTruthy()
  })
})
