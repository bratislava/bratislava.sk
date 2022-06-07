import { render } from '@testing-library/react'

import { WelcomeCard } from './WelcomeCard'

describe('WelcomeCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeCard />)
    expect(baseElement).toBeTruthy()
  })
})
