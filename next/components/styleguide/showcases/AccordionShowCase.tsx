import Accordion from 'components/forms/simple-components/Accordion'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const AccordionShowCase = () => {
  return (
    <Wrapper direction="column" title="Accordion">
      <Stack direction="column">
        <Accordion size="sm" title="Headline" shadow>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Accordion>
        <Accordion size="md" title="Headline" shadow>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Accordion>
        <Accordion size="lg" title="Headline" shadow>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Accordion>
        <Accordion size="sm" title="Headline">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Accordion>
        <Accordion size="md" title="Headline">
          Text
        </Accordion>
        <Accordion size="lg" title="Headline">
          Text
        </Accordion>
        <Accordion size="sm" title="Headline" icon>
          Text
        </Accordion>
        <Accordion size="md" title="Headline" icon>
          Text
        </Accordion>
        <Accordion size="lg" title="Headline" icon className="sm:w-[500px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Accordion>
      </Stack>
    </Wrapper>
  )
}

export default AccordionShowCase
