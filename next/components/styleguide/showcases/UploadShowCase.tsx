import { FC } from 'react'

import Upload from '../../forms/Upload'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface UploadShowCaseProps {

}

const UploadShowCase: FC<UploadShowCaseProps> = ({}: UploadShowCaseProps) => {
  return (
    <Wrapper title="Upload" direction="column">
      <Stack>
        <Upload type="button"/>
        <Upload type="button" disabled/>
      </Stack>
      <Stack>
        <Upload type="button" sizeLimit={40} supportedFormats={['.jpg', '.png', '.pdf']}/>
        <Upload type="button" sizeLimit={40}/>
        <Upload type="button" supportedFormats={['.jpg', '.png', '.pdf']}/>
        <Upload type="button" sizeLimit={40} supportedFormats={['.jpg', '.png', '.pdf']} disabled/>
      </Stack>
      <Stack>
        <Upload type="dragAndDrop"/>
      </Stack>
      <Stack>
        <Upload type="dragAndDrop" disabled/>
      </Stack>
    </Wrapper>
  )
}

export default UploadShowCase
