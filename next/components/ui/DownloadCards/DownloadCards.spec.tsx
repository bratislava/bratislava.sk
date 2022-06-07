import { render } from '@testing-library/react'

import DownloadCards from './DownloadCards'

describe('DownloadCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DownloadCards />)
    expect(baseElement).toBeTruthy()
  })
})
