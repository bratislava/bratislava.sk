import { CopyIcon } from '@assets/ui-icons'
import { useCopyToClipboard } from 'usehooks-ts'

const ClipboardCopy = ({ copyText }: { copyText: string }) => {
  const [_, copy] = useCopyToClipboard()
  return (
    // TODO replace by Button component
    <button type="button" onClick={() => copy(copyText)}>
      <CopyIcon />
    </button>
  )
}

export default ClipboardCopy
