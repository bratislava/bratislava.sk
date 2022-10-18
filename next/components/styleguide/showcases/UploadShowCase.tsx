import { FC } from 'react'

import Upload from '../../forms/Upload/Upload'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'
import UploadedFile from '../../forms/Upload/UploadedFile'

interface UploadShowCaseProps {

}

const UploadShowCase: FC<UploadShowCaseProps> = ({}: UploadShowCaseProps) => {
  return (
    <Wrapper title="Upload" direction="column">
      <Stack direction="column">
        <div className="w-96">
          <UploadedFile fileName="fish.jpg"
                        onRemove={() => console.log('REMOVE')}/>
        </div>
        <div className="w-96">
          <UploadedFile fileName="something_wrong.jp"
                        errorMessage="Error message"
                        onRemove={() => console.log('REMOVE')}/>
        </div>
      </Stack>
      <Stack>
        <Upload type="button"/>
        <Upload type="button" disabled/>
      </Stack>
      <Stack direction="column">
        <Upload type="button" sizeLimit={40} supportedFormats={['.jpg', '.png', '.pdf']}/>
        <Upload type="button" sizeLimit={40}/>
        <Upload type="button" supportedFormats={['.jpg', '.png', '.pdf']}/>
        <Upload type="button" sizeLimit={40} supportedFormats={['.jpg', '.png', '.pdf']} disabled/>
      </Stack>
      <Stack direction="column">
        <Upload type="dragAndDrop"/>
        <Upload type="dragAndDrop" disabled/>
      </Stack>
      <Stack direction="column">
        <Upload type="dragAndDrop" sizeLimit={40} supportedFormats={['.jpg', '.png', '.pdf']}/>
        <Upload type="dragAndDrop" sizeLimit={40}/>
        <Upload type="dragAndDrop" supportedFormats={['.jpg', '.png', '.pdf']}/>
        <Upload type="dragAndDrop" sizeLimit={40} supportedFormats={['.jpg', '.png', '.pdf']} disabled/>
      </Stack>
    </Wrapper>
  )
}

export default UploadShowCase
