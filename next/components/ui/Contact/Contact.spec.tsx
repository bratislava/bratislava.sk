import { render } from '@testing-library/react'

import { Contact } from './Contact'

describe('Contact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Contact />)
    expect(baseElement).toBeTruthy()
  })
})
