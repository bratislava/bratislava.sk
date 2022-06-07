import { render } from '@testing-library/react'

import PageLinkButton from './PageLinkButton'

describe('PageLinkButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageLinkButton />)
    expect(baseElement).toBeTruthy()
  })
})
