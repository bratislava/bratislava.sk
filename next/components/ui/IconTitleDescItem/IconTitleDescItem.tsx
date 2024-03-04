import { UploadImageSrcEntityFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'
import Image from 'next/image'

type IconTitleDescProps = {
  icon: UploadImageSrcEntityFragment | null | undefined
  title: string | null | undefined
  text: string | null | undefined
  hasBackground?: boolean | null | undefined
}

const IconTitleDescItem = ({ icon, title, text, hasBackground = false }: IconTitleDescProps) => {
  return (
    <li className="relative flex flex-col items-center gap-6">
      <div
        className={cx('flex shrink-0 items-center justify-center rounded-full p-6', {
          'bg-white': hasBackground,
          'bg-category-200': !hasBackground,
        })}
      >
        {icon?.attributes?.url && (
          <div className="relative h-18 w-18">
            <Image src={icon.attributes.url} fill alt="" />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-2 text-center">
        <Typography type="h3" size="h4">
          {title}
        </Typography>
        <Markdown content={text} />
      </div>
    </li>
  )
}

export default IconTitleDescItem
