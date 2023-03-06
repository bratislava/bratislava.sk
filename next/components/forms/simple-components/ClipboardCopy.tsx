import ContentCopy from '@assets/images/content_copy.svg'
import { useCopyToClipboard } from 'usehooks-ts'

const ClipboardCopy = ({ copyText }: { copyText: string }) => {
  const [_, copy] = useCopyToClipboard()
  return (
    <button
      type="button"
      onClick={() => {
        copy(copyText)
          .then(() => {})
          .catch(() => {})
      }}
    >
      <ContentCopy />
    </button>
  )
}

export default ClipboardCopy
