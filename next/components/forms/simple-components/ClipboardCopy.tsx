import { CopyIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import { useCopyToClipboard } from 'usehooks-ts'

const ClipboardCopy = ({ copyText }: { copyText: string }) => {
  const [_, copy] = useCopyToClipboard()
  return (
    <Button
      variant="icon-wrapped"
      icon={<CopyIcon />}
      aria-label="Copy to clipboard"
      onPress={() => copy(copyText)}
    />
  )
}

export default ClipboardCopy
