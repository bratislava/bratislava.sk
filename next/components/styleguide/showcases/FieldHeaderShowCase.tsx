import React from 'react'

import FieldErrorMessage from '../../forms/FieldErrorMessage'
import FieldHeader from '../../forms/FieldHeader'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface FieldHeaderShowCaseProps {

}

const FieldHeaderShowCase = ({}: FieldHeaderShowCaseProps) => {
  return (
    <>
      <Wrapper direction="column" title="Field header" >
        <Stack>
          <FieldHeader label="Simple" htmlFor="input-name"/>
        </Stack>
        <Stack>
          <FieldHeader label="Required" htmlFor="input-name" required/>
        </Stack>
        <Stack>
          <FieldHeader label="Tooltip" htmlFor="input-name" tooltip="This is random tooltip"/>
        </Stack>
        <Stack>
          <FieldHeader label="Description" htmlFor="input-name" description="This is simple description"/>
        </Stack>
        <Stack>
          <FieldHeader label="Everything" htmlFor="input-name"
                       description="This is is simple description" tooltip="This is some tooltip"
                       required/>
        </Stack>
        <Stack>
          <FieldHeader label="Everything but optional" htmlFor="input-name"
                       description="This is is simple description" tooltip="This is some tooltip" />
        </Stack>
      </Wrapper>

      <Wrapper direction="column" title="Field error message" >
        <Stack>
          <FieldErrorMessage errorMessage="This is error message for fields"/>
        </Stack>
      </Wrapper>
    </>
  )
}

export default FieldHeaderShowCase
