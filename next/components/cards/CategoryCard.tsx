import React from 'react'

import CardBase, { CardBaseProps } from '@/components/cards/CardBase'
import CardContent from '@/components/cards/CardContent'
import Button from '@/components/common/Button/Button'
import { CommonLinkProps } from '@/utils/getCommonLinkProps'

type Props = {
  title: string
  linkProps: CommonLinkProps
} & CardBaseProps

const CategoryCard = ({ title, linkProps, ...rest }: Props) => {
  return (
    <CardBase className="h-[240px]" {...rest}>
      <CardContent className="h-full justify-between p-6">
        {/* FIXME Typography. Convert to use Typography. Issue: Probably safe to convert but cant find page where is this used for testing */}
        <h3 className="text-h4 line-clamp-4 group-hover:underline">{title}</h3>
        <Button variant="black-link" stretched {...linkProps} />
      </CardContent>
    </CardBase>
  )
}

export default CategoryCard
