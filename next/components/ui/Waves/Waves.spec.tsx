import { render } from '@testing-library/react'

import Waves from './Waves'

describe('Waves', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Waves />)
    expect(baseElement).toBeTruthy()
  })
})
