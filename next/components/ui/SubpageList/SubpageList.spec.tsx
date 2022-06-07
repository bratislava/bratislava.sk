import { render } from '@testing-library/react'

import SubpageList from './SubpageList'

describe('SubpageList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubpageList />)
    expect(baseElement).toBeTruthy()
  })
})
