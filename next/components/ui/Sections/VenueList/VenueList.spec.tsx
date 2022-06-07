import { render } from '@testing-library/react'

import VenueList from './VenueList'

describe('VenueList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VenueList />)
    expect(baseElement).toBeTruthy()
  })
})
