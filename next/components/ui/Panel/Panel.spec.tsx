import { render } from '@testing-library/react'

import { Panel } from './Panel'

describe('Panel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Panel />)
    expect(baseElement).toBeTruthy()
  })
})
