import { Tag } from '@bratislava/ui-bratislava'
import { useUIContext } from '@utils/ui-context'
import React, { FC } from 'react'

interface Props {
  tagTitle?: string
  tagColor?: string
  linkHref: string
  title: string
}

export const SidePosts: FC<Props> = ({ tagTitle, title, tagColor, linkHref }) => {
  const { Link: UILink } = useUIContext()
  const shouldShowTag = tagTitle && tagColor

  return (
    <div className="mb-5">
      {shouldShowTag && (
        <div className="mb-1">
          <Tag title={tagTitle} color={tagColor} />
        </div>
      )}
      <UILink href={linkHref}>
        <div className={`hover:text-[color:rgb(var(--color- mb-8 font-semibold underline${tagColor}))]`}>{title}</div>
      </UILink>
    </div>
  )
}
