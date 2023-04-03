import { ListCircle, ListCircleFull } from '@assets/images'
import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'

import { PageLinkButton } from '../PageLinkButton/PageLinkButton'

export interface ListItemProps {
  className?: string
  content?: string
  circleOption?: 'primary' | 'secondary'
  moreLink?: { title?: string; url?: string }
}

export const ListItem = ({
  className,
  content,
  circleOption = 'primary',
  moreLink,
}: ListItemProps) => {
  const Circle = circleOption === 'primary' ? ListCircleFull : ListCircle
  return (
    <div className={cx(className, 'flex flex-row items-center')}>
      <div className="text-category-600">
        <Circle />
      </div>

      <div className="ml-6 flex flex-col lg:ml-14">
        {content && <Markdown content={content} />}
        {(moreLink?.url || moreLink?.title) && <PageLinkButton pageLink={moreLink} />}
      </div>
    </div>
  )
}

export default ListItem
