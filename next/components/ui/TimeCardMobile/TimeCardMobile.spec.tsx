import { render } from '@testing-library/react'

import TimeCardMobile from './TimeCardMobile'

describe('TimeCardMobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimeCardMobile />)
    expect(baseElement).toBeTruthy()
  })
})
