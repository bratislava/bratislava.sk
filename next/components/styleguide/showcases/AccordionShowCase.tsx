import Accordion from 'components/forms/Accordion'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const AccordionShowCase = () => {
  return (
    <Wrapper direction="column" title="Accordion">
      <Stack direction="column">
        <Accordion
          size="sm"
          title="Headline"
          content={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          }
        />
        <Accordion size="md" title="Headline" content="Text" />
        <Accordion size="lg" title="Headline" content="Text" />
        <Accordion size="sm" content="Text" title="Headline" icon />
        <Accordion size="md" content="Text" title="Headline" icon />
        <Accordion size="lg" content="Text" title="Headline" icon className="w-[500px]" />
      </Stack>
    </Wrapper>
  )
}

export default AccordionShowCase
