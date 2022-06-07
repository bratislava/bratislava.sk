import { NumberSwitcher } from '@bratislava/ui-bratislava'
import { render } from '@testing-library/react'

describe('NumberSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NumberSwitcher />)
    expect(baseElement).toBeTruthy()
  })
})
