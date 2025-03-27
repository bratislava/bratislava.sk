import { useCopyToClipboard } from 'usehooks-ts'

import { CopyIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import { useTranslation } from '@/src/utils/useTranslation'

const CopyToClipboardButton = ({ copyText }: { copyText: string }) => {
  const [, copy] = useCopyToClipboard()
  const { t } = useTranslation()

  return (
    <Button
      variant="icon-wrapped"
      icon={<CopyIcon />}
      aria-label={t('CopyToClipboardButton.copyToClipboard')}
      onPress={() => copy(copyText)}
    />
  )
}

export default CopyToClipboardButton
