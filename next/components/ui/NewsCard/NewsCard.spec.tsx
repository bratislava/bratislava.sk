import { render } from '@testing-library/react'

import NewsCard from './NewsCard'

describe('NewsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsCard />)
    expect(baseElement).toBeTruthy()
  })
})
