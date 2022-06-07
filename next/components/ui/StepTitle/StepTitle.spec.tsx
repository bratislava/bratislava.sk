import { render } from '@testing-library/react'

import StepTitle from './StepTitle'

describe('StepTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StepTitle />)
    expect(baseElement).toBeTruthy()
  })
})
