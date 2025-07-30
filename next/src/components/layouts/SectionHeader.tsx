import { Typography } from '@bratislava/component-library'
import slugify from '@sindresorhus/slugify'

import { SectionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import { TABLE_OF_CONTENTS_HEADING_ATTRIBUTE } from '@/src/components/common/TableOfContents/useHeadings'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { CommonLinkFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'

type SectionHeaderProps = {
  title?: string | null | undefined
  titleId?: string
  titleLevel?: SectionTitleLevel | null | undefined
  text?: string | null | undefined
  asRichtext?: boolean
  isFullWidth?: boolean
  isCentered?: boolean
  showMoreLink?: CommonLinkFragment | null | undefined
  className?: string
}

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/layout/Section/SectionHeader.tsx
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-21162&m=dev
 */

const SectionHeader = ({
  title,
  titleId,
  titleLevel,
  text,
  asRichtext = false,
  isFullWidth = false,
  isCentered = false,
  showMoreLink,
  className,
}: SectionHeaderProps) => {
  if (!title && !text && !showMoreLink) {
    return null
  }

  return (
    <div
      {...TABLE_OF_CONTENTS_HEADING_ATTRIBUTE}
      className={cn('flex items-center lg:justify-end', {
        'flex items-start gap-y-4 max-lg:flex-col lg:justify-between': title,
        'lg:justify-start': !showMoreLink,
      })}
    >
      {title || text ? (
        <div
          className={cn(
            'flex w-full flex-col items-start gap-2',
            {
              'mx-auto items-center text-center': isCentered,
              'max-w-[50rem]': !isFullWidth, // 50rem = 800px
            },
            className,
          )}
        >
          {title ? (
            <Typography variant={titleLevel ?? 'h2'} id={titleId ?? slugify(title)}>
              {title}
            </Typography>
          ) : null}
          {text ? (
            asRichtext ? (
              <Markdown content={text} />
            ) : (
              <Typography variant="p-default">{text}</Typography>
            )
          ) : null}
        </div>
      ) : null}

      {showMoreLink ? (
        <div
          className={cn({
            // Styling is a bit different from Figma, to make it more consistent.
            // Adding mt-2 when title is used for better alignment to center of first line
            'lg:mt-2': title,
          })}
        >
          <Button variant="link" {...getLinkProps(showMoreLink)} />
        </div>
      ) : null}
    </div>
  )
}

export default SectionHeader
