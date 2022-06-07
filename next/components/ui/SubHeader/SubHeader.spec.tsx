import { render } from '@testing-library/react'

import SubHeader from './SubHeader'

describe('SubHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubHeader />)
    expect(baseElement).toBeTruthy()
  })
})
