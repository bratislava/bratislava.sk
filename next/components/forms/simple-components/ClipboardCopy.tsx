import ContentCopy from '@assets/images/content_copy.svg'

const copyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text)
  }
  return document.execCommand('copy', true, text)
}
const ClipboardCopy = ({ copyText }: any) => {
  return (
    <button
      type="button"
      onClick={() => {
        copyTextToClipboard(copyText).then(() => {})
      }}
    >
      <ContentCopy />
    </button>
  )
}

export default ClipboardCopy
