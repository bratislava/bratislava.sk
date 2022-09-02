import { ArrowRight, ChevronRight } from '@assets/images'
import { Button } from '@bratislava/ui-bratislava'
import { FC } from 'react'

interface Props {
  buttonTitle: string
}

export const PostButton: FC<Props> = ({ buttonTitle }) => (
  <div className="flex justify-center">
    {/* TODO: change this button to custom button */}
    <Button
      variant="transparent"
      className="mt-0 px-6 py-2 text-default font-medium shadow-none"
      icon={<ChevronRight />}
      hoverIcon={<ArrowRight />}
    >
      {buttonTitle}
    </Button>
  </div>
)
