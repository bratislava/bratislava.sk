import React from 'react'

import Accordion from '@/src/components/common/Accordion/Accordion'
import Wrapper from '@/src/components/styleguide/Wrapper'

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
