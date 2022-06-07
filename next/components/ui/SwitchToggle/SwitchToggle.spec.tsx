import { render } from '@testing-library/react'

import { SwitchToggle } from './SwitchToggle'

describe('SwitchToggle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SwitchToggle />)
    expect(baseElement).toBeTruthy()
  })
})
