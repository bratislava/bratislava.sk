import ContentCopy from '@assets/images/content_copy.svg'
import { useSnackbar } from 'react-simple-snackbar'
import { useCopyToClipboard } from 'usehooks-ts'

const optionsInfo = {
  style: {
    backgroundColor: 'rgb(var(--color-gray-700))',
  },
}
const ClipboardCopy = ({ copyText }: { copyText: string }) => {
  const [_, copy] = useCopyToClipboard()
  const [openSnackbarInfo] = useSnackbar(optionsInfo)
  return (
    <button
      type="button"
      onClick={() => {
        copy(copyText)
        openSnackbarInfo('IBAN bol skopírovaný', 3000)
      }}
    >
      <ContentCopy />
    </button>
  )
}

export default ClipboardCopy
