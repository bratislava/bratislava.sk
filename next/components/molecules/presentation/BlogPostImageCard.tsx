import { Typography } from '@bratislava/component-library'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import CardBase, { CardBaseProps } from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import Image from 'next/image'
import React from 'react'

type Props = {
  title: string
  linkHref: string
  imgSrc?: string
  imgSizes?: string
  date?: string
  tag?: string
  text?: string
} & CardBaseProps

// TODO this component was created as a quickfix for Featured Blog Posts, it should be revisited or removed
const BlogPostImageCard = ({
  imgSrc,
  imgSizes,
  date,
  tag,
  title,
  text,
  linkHref,
  ...rest
}: Props) => {
  return (
    <CardBase className="h-full" {...rest}>
      {imgSrc ? (
        <Image src={imgSrc} alt="" fill className="object-cover" sizes={imgSizes} />
      ) : (
        <ImagePlaceholder />
      )}
      <CardContent className="absolute flex h-full w-full flex-col justify-end gap-2 bg-gradient-to-t from-gray-800 to-transparent text-white">
        {tag && <Tag text={tag} isColored />}
        <MLink href={linkHref} stretched variant="underlineOnHover">
          <Typography type="h2" size="h4">
            {title}
          </Typography>
        </MLink>
        {date && <Typography type="p">{date}</Typography>}
      </CardContent>
    </CardBase>
  )
}

export default BlogPostImageCard
