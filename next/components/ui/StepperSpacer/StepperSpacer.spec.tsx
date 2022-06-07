import { render } from '@testing-library/react'

import StepperSpacer from './StepperSpacer'

describe('StepperSpacer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StepperSpacer />)
    expect(baseElement).toBeTruthy()
  })
})
