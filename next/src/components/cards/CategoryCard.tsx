import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  title: string
  linkProps: CommonLinkProps
} & CardBaseProps

const CategoryCard = ({ title, linkProps, ...rest }: Props) => {
  const titleId = useId()

  return (
    <CardBase className="h-[240px]" {...rest}>
      <CardContent className="h-full justify-between p-6">
        <Typography id={titleId} variant="h4" as="h3" className="group-hover:underline">
          {title}
        </Typography>
        <Button variant="link" stretched {...linkProps} aria-labelledby={titleId} />
      </CardContent>
    </CardBase>
  )
}

export default CategoryCard
