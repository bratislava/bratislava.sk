import { render } from '@testing-library/react'

import News from './News'

describe('News', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<News />)
    expect(baseElement).toBeTruthy()
  })
})
