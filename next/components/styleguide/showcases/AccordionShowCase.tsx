import Accordion from 'components/forms/Accordion'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const AccordionShowCase = () => {
  return (
    <Wrapper direction="column" title="Accordion">
      <Stack direction="column">
        <Accordion size='sm' title={'Headline'} content={'Text'}/>
        <Accordion size='md' title={'Headline'} content={'Text'}/>
        <Accordion size='lg' title={'Headline'} content={'Text'}/>
        {/*<Accordion size='md'/>*/}
        {/*<Accordion size='lg'/>*/}
      </Stack>
    </Wrapper>
  )
}

export default AccordionShowCase
