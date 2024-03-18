import Wrapper from '@components/styleguide/Wrapper'
import AccordionV2 from '@components/ui/AccordionV2/AccordionV2'
import React from 'react'

const AccordionShowcase = () => {
  return (
    <Wrapper direction="column" title="Accordion">
      <AccordionV2 variant="boxed" title="Accordion boxed (default)">
        Content
      </AccordionV2>

      <AccordionV2 variant="footer" title="Accordion footer">
        Content
      </AccordionV2>
    </Wrapper>
  )
}
export default AccordionShowcase
