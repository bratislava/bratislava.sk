import { render } from '@testing-library/react'

import InputAccessory from './InputAccessory'

describe('InputAccessory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputAccessory />)
    expect(baseElement).toBeTruthy()
  })
})
