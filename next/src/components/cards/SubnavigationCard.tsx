import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import Button from '@/src/components/common/Button/Button'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  title: string
  text?: string
  linkPropsWithoutChildren: Omit<CommonLinkProps, 'children'>
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15659&m=dev
 */

const SubnavigationCard = ({ title, text, linkPropsWithoutChildren, ...rest }: Props) => {
  const titleId = useId()

  return (
    <CardBase variant="no-border" {...rest}>
      <div className="flex h-full items-start gap-3">
        {/* Button renders only link arrow since children are omitted */}
        <Button
          variant="link"
          stretched
          {...linkPropsWithoutChildren}
          aria-labelledby={titleId}
          // top padding is used to align with the first line of title
          className="pt-0.5"
        />

        <div className="flex flex-col gap-2 group-hover:text-content-active-primary-hover">
          <Typography id={titleId} variant="h5" as="h3" className="group-hover:underline">
            {title}
          </Typography>
          <Typography variant="p-small">{text}</Typography>
        </div>
      </div>
    </CardBase>
  )
}

export default SubnavigationCard
