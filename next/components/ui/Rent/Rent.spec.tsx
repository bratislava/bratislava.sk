import { render } from '@testing-library/react'

import Rent from './Rent'

describe('Rent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Rent />)
    expect(baseElement).toBeTruthy()
  })
})
