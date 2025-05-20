import { Typography } from '@bratislava/component-library'

import CardBase from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  title: string
  imageSrc: string
  linkProps: CommonLinkProps
}

const MayorAndCouncilCard = ({ title, imageSrc, linkProps }: Props) => {
  return (
    <CardBase
      variant="no-border"
      className="mt-16 flex w-full items-center overflow-visible rounded-lg lg:mt-28"
    >
      <div>
        <img
          src={imageSrc}
          alt=""
          className="absolute bottom-0 left-2 h-[126px] lg:left-16 lg:h-56"
        />
      </div>

      <CardContent className="flex w-full flex-col pl-32 lg:pl-72">
        <Typography variant="h4" as="h3" className="mb-1.5 lg:mb-3">
          {title}
        </Typography>
        <Button stretched variant="link" {...linkProps} />
      </CardContent>
    </CardBase>
  )
}

export default MayorAndCouncilCard
