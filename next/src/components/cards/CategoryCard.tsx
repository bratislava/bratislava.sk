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
        {/* FIXME Typography. Convert to use Typography. Issue: Probably safe to convert but cant find page where is this used for testing */}
        <h3 id={titleId} className="line-clamp-4 text-h4 group-hover:underline">
          {title}
        </h3>
        <Button variant="link" stretched {...linkProps} aria-labelledby={titleId} />
      </CardContent>
    </CardBase>
  )
}

export default CategoryCard
