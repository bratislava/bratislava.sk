import Wrapper from '@components/styleguide/Wrapper'
import AccordionV2 from '@components/ui/AccordionV2/AccordionV2'
import React from 'react'

const AccordionShowcase = () => {
  return (
    <Wrapper direction="column" title="Accordion">
      <AccordionV2 variant="boxed-h3" title="Accordion boxed-h3">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-h4" title="Accordion boxed-h4">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-h5" title="Accordion boxed-h5">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-h6" title="Accordion boxed-h6">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-with-shadow-h3" title="Accordion boxed-with-shadow-h3">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-with-shadow-h4" title="Accordion boxed-with-shadow-h4">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-with-shadow-h5" title="Accordion boxed-with-shadow-h5">
        Content
      </AccordionV2>
      <AccordionV2 variant="boxed-with-shadow-h6" title="Accordion boxed-with-shadow-h6">
        Content
      </AccordionV2>
      <AccordionV2 variant="footer" title="Accordion footer">
        Content
      </AccordionV2>
    </Wrapper>
  )
}
export default AccordionShowcase
