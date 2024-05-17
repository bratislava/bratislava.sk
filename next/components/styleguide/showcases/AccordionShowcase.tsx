import React from 'react'

import Wrapper from '@/components/styleguide/Wrapper'
import Accordion from '@/components/ui/Accordion/Accordion'

const AccordionShowcase = () => {
  return (
    <Wrapper direction="column" title="Accordion">
      <Accordion variant="boxed" title="Accordion boxed (default)">
        Content
      </Accordion>

      <Accordion variant="footer" title="Accordion footer">
        Content
      </Accordion>
    </Wrapper>
  )
}
export default AccordionShowcase
