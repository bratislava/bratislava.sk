import { FC, useState } from 'react'

import Upload from '../../forms/Upload/Upload'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'
import UploadedFile from '../../forms/Upload/UploadedFile'

interface UploadShowCaseProps {

}

const UploadShowCase: FC<UploadShowCaseProps> = ({}: UploadShowCaseProps) => {
  const [files1, setFiles1] = useState<File[]>([])
  const [files2, setFiles2] = useState<File[]>([])
  const [files3, setFiles3] = useState<File[]>([])
  const [files4, setFiles4] = useState<File[]>([])
  const [files5, setFiles5] = useState<File[]>([])
  const [files6, setFiles6] = useState<File[]>([])
  const [files7, setFiles7] = useState<File[]>([])
  const [files8, setFiles8] = useState<File[]>([])

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
        <Upload type="button"
                value={files1}
                onChange={(newValue) => setFiles1(newValue)}/>
        <Upload type="button"
                disabled/>
      </Stack>
      <Stack direction="column">
        <Upload type="button"
                sizeLimit={5}
                supportedFormats={['.jpg', '.png', '.pdf']}
                value={files2}
                onChange={(newValue) => setFiles2(newValue)}/>
        <Upload type="button"
                sizeLimit={5}
                value={files3}
                onChange={(newValue) => setFiles3(newValue)}/>
        <Upload type="button"
                supportedFormats={['.jpg', '.png', '.pdf']}
                value={files4}
                onChange={(newValue) => setFiles4(newValue)}/>
        <Upload type="button"
                sizeLimit={5}
                supportedFormats={['.jpg', '.png', '.pdf']}
                disabled/>
      </Stack>
      <Stack direction="column">
        <Upload type="dragAndDrop"
                value={files5}
                onChange={(newValue) => setFiles5(newValue)}/>
        <Upload type="dragAndDrop"
                disabled/>
      </Stack>
      <Stack direction="column">
        <Upload type="dragAndDrop"
                sizeLimit={5}
                supportedFormats={['.jpg', '.png', '.pdf']}
                value={files6}
                onChange={(newValue) => setFiles6(newValue)}/>
        <Upload type="dragAndDrop"
                sizeLimit={5}
                value={files7}
                onChange={(newValue) => setFiles7(newValue)} />
        <Upload type="dragAndDrop"
                supportedFormats={['.jpg', '.png', '.pdf']}
                value={files8}
                onChange={(newValue) => setFiles8(newValue)}/>
        <Upload type="dragAndDrop"
                sizeLimit={5}
                supportedFormats={['.jpg', '.png', '.pdf']}
                disabled/>
      </Stack>
    </Wrapper>
  )
}

export default UploadShowCase
