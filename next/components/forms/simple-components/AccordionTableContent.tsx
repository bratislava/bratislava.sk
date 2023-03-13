import cx from 'classnames'
import React, { useState } from 'react'

import ExpandMoreIcon from '../icon-components/ExpandMoreIcon'
import PersonIcon from '../icon-components/PersonIcon'
import AccountMarkdown from '../segments/AccountMarkdown/AccountMarkdown'
import AccountMarkdownModal from '../segments/AccountModal/AccountModal'

const tableHeaderData = {
  subject: 'Predmet dane',
  area: 'Výmera pozemku v m<sup>2</sup>',
  base: 'Základ dane m<sup>2</sup>',
  total: 'Daň v EUR',
}

const tableTotal = {
  ground: '0,00 €',
  construction: '0,00 €',
  apartment: '58,00 €',
}

const matchHeader = {
  ground: [tableHeaderData.area, tableHeaderData.base, tableHeaderData.total],
  construction: [tableHeaderData.base, tableHeaderData.total],
  apartment: [tableHeaderData.base, tableHeaderData.total],
}
export type AccordionSizeType = 'xs' | 'sm' | 'md' | 'lg'
const groundData = {
  A: {
    title: 'Orná pôda, chmeľnice, vinice, ovocné sady',
    description: '(§ 6 ods. 1 písm. a) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  B: {
    title: 'Trvalé trávnaté porasty',
    description: '(§ 6 ods. 1 písm. a) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  C: {
    title: 'Záhrady',
    description: '(§ 6 ods. 1 písm. b) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  D: {
    title: 'Lesné pozemky, na ktorých sú hospodárske lesy',
    description: '(§ 6 ods. 1 písm. d) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  E: {
    title: 'Rybníky s chovom rýb a ostatné hospodársky využívané vodné plochy',
    description: '(§ 6 ods. 1 písm. d) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  F: {
    title: 'Zastavané plochy a nádvoria',
    description: '(§ 6 ods. 1 písm. c) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  G: {
    title: 'Stavebné pozemky',
    description: '(§ 6 ods. 1 písm. e) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
  H: {
    title: 'Ostatné plochy',
    description: '(§ 6 ods. 1 písm. c) zákona)',
    area: '0,00',
    base: '0,00',
    total: '0,00',
  },
}

const constructionData = {
  A: {
    title: 'Stavba na bývanie',
    description: '(§ 10 ods. 1 písm. a) zákona)',
    base: '0,00',
    total: '0,00',
  },
  B: {
    title: 'Stavby na pôdohospodársku produkciu',
    description: '(§ 10 ods. 1 písm. b) zákona)',
    base: '0,00',
    total: '0,00',
  },
  C: {
    title: 'Chaty',
    description: '(§ 10 ods. 1 písm. c) zákona)',
    base: '0,00',
    total: '0,00',
  },
  D: {
    title: 'Samostatne stojace garáže',
    description: '(§ 10 ods. 1 písm. d) zákona)',
    base: '0,00',
    total: '0,00',
  },
  E: {
    title: 'Stavby hromadných garáží',
    description: '(§ 10 ods. 1 písm. e) zákona)',
    base: '0,00',
    total: '0,00',
  },
  F: {
    title: 'Stavby hromadných garáží umiestnených pod zemou',
    description: '(§ 10 ods. 1 písm. f) zákona)',
    base: '0,00',
    total: '0,00',
  },
  G: {
    title: 'Priemyselné stavby',
    description: '(§ 10 ods. 1 písm. g) zákona)',
    base: '0,00',
    total: '0,00',
  },
  jH: {
    title: 'Stavba na ost. podnik. a zárobk. činnosť, skladovanie a administratívu',
    description: '(§ 10 ods. 1 písm. h) zákona)',
    base: '0,00',
    total: '0,00',
  },
  jI: {
    title: 'Ostatné stavby',
    description: '(§ 10 ods. 1 písm. i) zákona)',
    base: '0,00',
    total: '0,00',
  },
  H: {
    title: 'Viacúčelová stavba',
    description: '(§ 12 ods. 6 zákona)',
    base: '0,00',
    total: '0,00',
  },
}

const apartmentData = {
  residential: {
    title: 'Byt',
    description: '(§ 14 zákona)',
    base: '58,00',
    total: '58,00',
  },
  nonResidential: {
    title: 'Nebytový priestor',
    description: '(§ 14 zákona)',
    base: '0,00',
    total: '0,00',
  },
}

const matchMainData = {
  ground: groundData,
  construction: constructionData,
  apartment: apartmentData,
}
export type AccordionBase = {
  size: AccordionSizeType
  title: string
  secondTitle?: string
  dataType: 'ground' | 'construction' | 'apartment'
  data: any
  icon?: boolean
  shadow?: boolean
  className?: string
}
export const isAccordionSizeType = (size: string) =>
  ['xs', 'sm', 'md', 'lg'].includes(size) ? size : 'sm'

const TableHeaderRow = ({ dataType }: { dataType: 'ground' | 'construction' | 'apartment' }) => {
  const headerData = matchHeader[dataType]

  return (
    <thead className="lg:bg-gray-0 bg-gray-200 self-stretch">
      <tr>
        <th className="text-16 first:rounded-tl last:rounded-tr [&:not(:first-child)]:text-center border-spacing-0 border-b-2 text-left lg:py-4 lg:p-0 p-4">
          Predmet dane
        </th>
        {headerData.map((header) => {
          return (
            <th className="text-16 first:rounded-tl last:rounded-tr [&:not(:first-child)]:text-center border-spacing-0 border-b-2 text-left lg:py-4 lg:p-0 p-4">
              <AccountMarkdown content={`<div class="text-16 p-2">${header}</div>`} />
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

const TableRow = ({ dataType }: { dataType: 'ground' | 'construction' | 'apartment' }) => {
  const mainData = matchMainData[dataType] as Record<any, any>
  const mainDataKeys = Object.keys(mainData)
  return (
    <tbody>
      {mainDataKeys.map((k) => {
        return (
          <tr>
            <td className="[&:not(:first-child)]:text-20-semibold border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 h-max lg:p-0 p-4">
              <div className="h-0 font-semibold inline">{mainData[k].title}</div>
              <br />
              {mainData[k].description}
            </td>
            {dataType === 'ground' && (
              <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold w-[15%] border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
                {mainData[k].area}
              </td>
            )}
            <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold w-[15%] border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
              {mainData[k].base}
            </td>
            <td className="lg:[&:not(:first-child)]:text-20-semibold [&:not(:first-child)]:text-16-semibold w-[15%] border-r-2 [&:not(:first-child)]:text-center last:border-r-0 lg:py-4 lg:p-0 p-4">
              {mainData[k].total}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}

const Table = ({ dataType }: { dataType: 'ground' | 'construction' | 'apartment' }) => {
  return (
    <div className="no-scrollbar overflow-x-auto w-full">
      <table className="border-separate border-spacing-0 border-2 border-solid border-gray-200 lg:border-0 sm:w-full w-max table-auto lg:rounded-none rounded-lg last:border-b-2">
        <TableHeaderRow dataType={dataType} />
        <TableRow dataType={dataType} />
      </table>
    </div>
  )
}
const AccordionTableContent = ({
  title,
  secondTitle,
  size = 'sm',
  icon = false,
  dataType,
  data,
  shadow = false,
  className,
}: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionSize = isAccordionSizeType(size) as AccordionSizeType

  const TableContent = () => (
    <div className="h-full flex flex-col w-full gap-6">
      <Table dataType={dataType} />
      <div className="flex lg:bg-gray-0 bg-gray-100 lg:p-0 p-4 rounded-lg">
        <div className="text-h4-bold grow">Celkom</div>
        <div className="text-h4-bold">{tableTotal[dataType]}</div>
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
              <div
                className={cx('flex sm:items-center justify-center items-start', {
                  'w-10 h-10': accordionSize === 'lg',
                  'w-8 h-8': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                })}
              >
                <ExpandMoreIcon
                  className={cx({
                    'transform rotate-180': isActive,
                    'transform rotate-270 md:rotate-0': !isActive,
                  })}
                  size={accordionSize}
                />
              </div>
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
