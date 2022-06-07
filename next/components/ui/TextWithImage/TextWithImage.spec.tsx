import { render } from '@testing-library/react'

import TextWithImage from './TextWithImage'

describe('TextWithImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextWithImage />)
    expect(baseElement).toBeTruthy()
  })
})
