import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import CardBase from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { CommonLinkProps } from '@utils/getCommonLinkProps'

type Props = {
  title: string
  imageSrc: string
  linkProps: CommonLinkProps
}

const MayorAndCouncilCard = ({ title, imageSrc, linkProps }: Props) => {
  return (
    <CardBase
      variant="shadow"
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
        <Typography type="h3" size="h4" className="mb-1.5 lg:mb-3">
          {title}
        </Typography>
        <Button stretched variant="category-link" {...linkProps} />
      </CardContent>
    </CardBase>
  )
}

export default MayorAndCouncilCard
