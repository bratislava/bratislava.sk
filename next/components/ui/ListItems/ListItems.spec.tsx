import { render } from '@testing-library/react'

import ListItems from './ListItems'

describe('ListItems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListItems />)
    expect(baseElement).toBeTruthy()
  })
})
