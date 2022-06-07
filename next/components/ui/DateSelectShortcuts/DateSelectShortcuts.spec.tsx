import { render } from '@testing-library/react'

import DateSelectShortcuts from './DateSelectShortcuts'

describe('DateSelectShortcuts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateSelectShortcuts />)
    expect(baseElement).toBeTruthy()
  })
})
