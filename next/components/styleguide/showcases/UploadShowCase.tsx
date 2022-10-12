import { FC } from 'react'

import Upload from '../../forms/Upload'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface UploadShowCaseProps {

}

const UploadShowCase: FC<UploadShowCaseProps> = ({}: UploadShowCaseProps) => {
  return (
    <Wrapper title="Upload">
      <Stack>
        <Upload type="button"/>
      </Stack>
    </Wrapper>
  )
}

export default UploadShowCase
