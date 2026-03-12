import { useCopyToClipboard } from 'usehooks-ts'

import Button from '@/src/components/common/Button/Button'
import Icon from '@/src/components/common/Icon/Icon'

type Props = {
  copyText: string
  children: React.ReactNode
  ariaLabel?: string
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19537-24027&m=dev
 */

const CopyToClipboardButton = ({ copyText, ariaLabel, children, className }: Props) => {
  const [, copy] = useCopyToClipboard()

  return (
    <Button
      variant="outline"
      startIcon={<Icon name="copy" />}
      aria-label={ariaLabel}
      onPress={() => {
        void copy(copyText)
      }}
      className={className}
    >
      {children}
    </Button>
  )
}

export default CopyToClipboardButton
