import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from 'usehooks-ts'

import { CopyIcon } from '@/assets/ui-icons'
import Button from '@/components/common/Button/Button'

const CopyToClipboardButton = ({ copyText }: { copyText: string }) => {
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

export default CopyToClipboardButton
