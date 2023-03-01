import ContentCopy from '@assets/images/content_copy.svg'
import { useCopyToClipboard } from 'usehooks-ts'

const ClipboardCopy = ({ copyText }: { copyText: string }) => {
  const [_, copy] = useCopyToClipboard()
  return (
    <button
      type="button"
      onClick={async () => {
        await copy(copyText)
      }}
    >
      <ContentCopy />
    </button>
  )
}

export default ClipboardCopy
