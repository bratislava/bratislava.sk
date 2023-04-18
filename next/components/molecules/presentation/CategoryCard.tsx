import Button from '@components/forms/simple-components/Button'
import CardBase, { CardBaseProps } from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { CommonLinkProps } from '@utils/getCommonLinkProps'
import React from 'react'

type Props = {
  title: string
  linkProps: CommonLinkProps
} & CardBaseProps

const CategoryCard = ({ title, linkProps, ...rest }: Props) => {
  return (
    <CardBase className="h-[240px]" {...rest}>
      <CardContent className="h-full justify-between p-6">
        <h3 className="text-h4 line-clamp-4 group-hover:underline">{title}</h3>
        <Button variant="black-link" stretched {...linkProps} />
      </CardContent>
    </CardBase>
  )
}

export default CategoryCard
