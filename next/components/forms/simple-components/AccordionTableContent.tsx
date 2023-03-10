import ExpandMore from '@assets/images/expand-more.svg'
import cx from 'classnames'
import React, { useState } from 'react'

import PersonIcon from '../icon-components/PersonIcon'
import AccountMarkdownModal from '../segments/AccountModal/AccountModal'

export type AccordionSizeType = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionBase = {
  size: AccordionSizeType
  title: string
  secondTitle?: string
  data: any
  icon?: boolean
  shadow?: boolean
  className?: string
}
export const isAccordionSizeType = (size: string) =>
  ['xs', 'sm', 'md', 'lg'].includes(size) ? size : 'sm'

const TableHeaderRow = () => {
  return (
    <thead className="lg:bg-gray-0 bg-gray-200 self-stretch">
      <tr>
        <th className="text-16 first:rounded-tl last:rounded-tr [&:not(:first-child)]:text-center border-spacing-0 border-b-2 text-left lg:py-4 lg:p-0 p-4">
          Predmet dane
        </th>
        <th className="text-16 w-max grow first:rounded-tl last:rounded-tr [&:not(:first-child)]:text-center border-spacing-0 border-b-2 text-left lg:py-4 lg:p-0 p-4">
          Základ dane v m<sup>2</sup>
        </th>
        <th className="text-16 grow first:rounded-tl last:rounded-tr [&:not(:first-child)]:text-center border-spacing-0 border-b-2 text-left lg:py-4 lg:p-0 p-4">
          Daň v EUR
        </th>
      </tr>
    </thead>
  )
}

const TableRow = () => {
  return (
    <tbody>
      <tr>
        <td className="[&:not(:first-child)]:text-20-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
          <div className="h-0 font-semibold">Byt</div>
          <br />
          (§ 14 zákona)
        </td>
        <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
          58,00
        </td>
        <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
          58,00
        </td>
      </tr>
      <tr>
        <td className="[&:not(:first-child)]:text-20-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
          <div className="h-0 font-semibold">Nebytový priestor</div>
          <br />
          (§ 14 zákona)
        </td>
        <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
          0,00
        </td>
        <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
          0,00
        </td>
      </tr>
    </tbody>
  )
}

const Table = () => {
  return (
    <div className="no-scrollbar overflow-x-auto w-full">
      <table className="border-separate border-spacing-0 border-2 border-solid border-gray-200 lg:border-0 sm:w-full w-max table-auto lg:rounded-none rounded-lg last:border-b-2">
        <TableHeaderRow />
        <TableRow />
      </table>
    </div>
  )
}
const AccordionTableContent = ({
  title,
  secondTitle,
  size = 'sm',
  icon = false,
  shadow = false,
  className,
}: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionSize = isAccordionSizeType(size) as AccordionSizeType

  const TableContent = () => (
    <div className="flex flex-col w-full gap-6">
      <Table />
      <div className="flex lg:bg-gray-0 bg-gray-100 lg:p-0 p-4 rounded-lg">
        <div className="text-h4-bold grow">Celkom</div>
        <div className="text-h4-bold">58,00 €</div>
      </div>
    </div>
  )

  const paddingStyles = cx({
    'px-4 py-3 lg:p-4': accordionSize === 'xs',
    'p-4 lg:p-5': accordionSize === 'sm',
    'p-4 lg:py-6 lg:px-8': accordionSize === 'md',
    'py-5 px-6 lg:py-8 lg:px-10': accordionSize === 'lg',
  })

  const accordionHeaderStyle = cx(
    'flex flex-col gap-4 w-full rounded-xl bg-gray-0',
    className,
    paddingStyles,
  )
  const accordionContainerStyle = cx('flex flex-col w-full rounded-xl bg-gray-0', className, {
    'border-gray-200': !isActive && !shadow,
    'border-gray-700': isActive && !shadow,
    'border-2 border-solid hover:border-gray-500': !shadow,
    'hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.08)]': shadow,
    'shadow-[0_0_16px_0_rgba(0,0,0,0.08)]': isActive && shadow,
    'shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]': !isActive && shadow,
  })
  return (
    <div className="h-auto w-full">
      <div className="lg:hidden block">
        <AccountMarkdownModal
          show={isActive}
          onClose={() => setIsActive(false)}
          content={<TableContent />}
          onSubmit={() => {}}
          header={title}
        />
      </div>
      <div className={accordionContainerStyle}>
        <div className={cx('flex gap-4', accordionHeaderStyle)}>
          {icon && (
            <div
              className={cx('flex items-center justify-center', {
                'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                'w-8 h-8': accordionSize === 'md',
                'w-10 h-10': accordionSize === 'lg',
              })}
            >
              <PersonIcon
                className={cx('', {
                  'w-4 h-4': accordionSize === 'sm' || accordionSize === 'xs',
                  'w-5 h-5': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'lg',
                })}
              />
            </div>
          )}
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-4"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="flex grow sm:flex-row flex-col items-start">
                <div
                  className={cx('flex grow', {
                    'text-h6': accordionSize === 'xs',
                    'text-h5': accordionSize === 'sm',
                    'text-h4': accordionSize === 'md',
                    'text-h3': accordionSize === 'lg',
                  })}
                >
                  {title}
                </div>
                <div
                  className={cx('md:font-semibold', {
                    'text-p-base': size === 'xs',
                    'text-h-base': size === 'sm',
                    'md:text-h-md text-p-base': size === 'md',
                    'text-h-lg': size === 'lg',
                  })}
                >
                  {secondTitle}
                </div>
              </div>
              <ExpandMore
                className={cx('flex items-center justify-center', {
                  'lg:w-10 lg:h-10 w-8 h-8': accordionSize === 'lg',
                  'lg:w-8 lg:h-8 w-6 h-6': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                })}
              />
            </button>
          </div>
        </div>
        <div
          className={cx('h-0.5 w-full bg-gray-200', {
            hidden: !isActive,
          })}
        />
        {isActive && (
          <div
            className={cx('flex flex-col font-normal lg:block hidden', paddingStyles, {
              'text-h6': accordionSize === 'sm' || accordionSize === 'xs',
              'text-20': accordionSize === 'lg' || accordionSize === 'md',
            })}
          >
            <TableContent />
          </div>
        )}
      </div>
    </div>
  )
}

export default AccordionTableContent
