import { render } from '@testing-library/react'

import Links from './Links'

describe('Links', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Links />)
    expect(baseElement).toBeTruthy()
  })
})
