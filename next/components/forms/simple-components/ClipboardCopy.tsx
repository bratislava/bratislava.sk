import { CopyIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from 'usehooks-ts'

const ClipboardCopy = ({ copyText }: { copyText: string }) => {
  // eslint-disable-next-line no-unused-vars
  const [, copy] = useCopyToClipboard()
  const t = useTranslations()
  return (
    <Button
      variant="icon-wrapped"
      icon={<CopyIcon />}
      aria-label={t('copyToClipboard')}
      onPress={() => copy(copyText)}
    />
  )
}

export default ClipboardCopy
