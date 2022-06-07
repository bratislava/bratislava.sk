import { render } from '@testing-library/react'

import { RentReservationForm } from './RentReservationForm'

describe('RentReservationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RentReservationForm />)
    expect(baseElement).toBeTruthy()
  })
})
