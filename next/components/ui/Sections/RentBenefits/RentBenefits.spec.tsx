import { render } from '@testing-library/react'

import RentBenefits from './RentBenefits'

describe('RentBenefits', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RentBenefits />)
    expect(baseElement).toBeTruthy()
  })
})
