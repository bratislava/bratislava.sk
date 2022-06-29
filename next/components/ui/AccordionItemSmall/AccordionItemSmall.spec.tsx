import { render } from '@testing-library/react'

import AccordionItemSmall from './AccordionItemSmall'

describe('AccordionItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccordionItemSmall />)
    expect(baseElement).toBeTruthy()
  })
})
