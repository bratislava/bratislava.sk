import cx from 'classnames'

import ChevronDownSmall from '../../../assets/images/chevron-down-small.svg'
import ChevronUpSmall from '../../../assets/images/chevron-up-small.svg'
import { Button } from '../Button/Button'
import { TOrderSortBy } from '../Table/Table'

export type TOrderDirection = 'asc' | 'desc'

export interface TableHeaderProps {
  className?: string
  header: React.ReactNode
  field: string
  sortable: boolean
  sortBy?: TOrderSortBy
  onSort?: () => void
}

const directionIcon = (dir?: TOrderDirection) => (dir === 'asc' ? <ChevronUpSmall /> : <ChevronDownSmall />)

export const TableHeader = ({ className, header, sortable, field, sortBy, onSort }: TableHeaderProps) => (
  <th className={cx(className, 'text-left pb-5')}>
    {sortable ? (
      <Button
        className={cx('text-font p-0 hover:text-category-600', {
          'text-category-600': sortBy?.key === field,
        })}
        icon={directionIcon(sortBy?.direction)}
        onClick={onSort}
        shape="none"
      >
        {header}
      </Button>
    ) : (
      <span className="text-font">{header}</span>
    )}
  </th>
)

export default TableHeader
