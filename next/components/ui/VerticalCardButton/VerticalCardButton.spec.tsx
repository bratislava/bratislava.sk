import { render } from '@testing-library/react'

import VerticalCardButton from './VerticalCardButton'

describe('VerticalCardButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VerticalCardButton />)
    expect(baseElement).toBeTruthy()
  })
})
