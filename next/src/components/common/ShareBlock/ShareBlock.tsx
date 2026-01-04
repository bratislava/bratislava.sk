import { Typography } from '@bratislava/component-library'

import { ShareOutlineIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import ShareModal from '@/src/components/common/ShareBlock/ShareModal'

export type ShareBlockProps = {
  text: string
  buttonText: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19537-24022&t=QwxuvuEl3TqB3Ygm-4
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/common/ShareBlock/ShareBlock.tsx
 */

const ShareBlock = ({ text, buttonText }: ShareBlockProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-background-passive-secondary p-4 lg:flex-row lg:gap-2.5 lg:px-8 lg:py-6">
      <div className="grow">
        <Typography variant="h5">{text}</Typography>
      </div>
      <ShareModal
        triggerButton={
          <Button variant="outline" startIcon={<ShareOutlineIcon />} className="max-lg:w-full">
            {buttonText}
          </Button>
        }
      />
    </div>
  )
}

export default ShareBlock
