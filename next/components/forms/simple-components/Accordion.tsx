import cx from 'classnames'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

import ExpandMoreIcon from '../icon-components/ExpandMoreIcon'
import PersonIcon from '../icon-components/PersonIcon'
import TooltipComponent from '../info-components/Tooltip/Tooltip'

const Tooltip = ({ children }: never) =>
  children ? <TooltipComponent position="top-right" text={children} /> : null

export type AccordionSizeType = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionBase = {
  size: AccordionSizeType
  title: string
  secondTitle?: string
  content: string
  icon?: boolean
  shadow?: boolean
  className?: string
}
export const isAccordionSizeType = (size: string) =>
  ['xs', 'sm', 'md', 'lg'].includes(size) ? size : 'sm'

const Accordion = ({
  title,
  secondTitle,
  content,
  size = 'sm',
  icon = false,
  shadow = false,
  className,
}: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionSize = isAccordionSizeType(size) as AccordionSizeType

  const accordionContainerStyle = cx('flex flex-col gap-4 w-full rounded-xl bg-gray-0', className, {
    'px-4 py-3 lg:p-4': accordionSize === 'xs',
    'p-4 lg:p-5': accordionSize === 'sm',
    'p-4 lg:py-6 lg:px-8': accordionSize === 'md',
    'py-5 px-6 lg:py-8 lg:px-10': accordionSize === 'lg',
    'border-gray-200': !isActive && !shadow,
    'border-gray-700': isActive && !shadow,
    'border-2 border-solid hover:border-gray-500': !shadow,
    'hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.08)]': shadow,
    'shadow-[0_0_16px_0_rgba(0,0,0,0.08)]': isActive && shadow,
    'shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]': !isActive && shadow,
  })

  return (
    <div className={accordionContainerStyle}>
      <div className={cx('flex gap-4', {})}>
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
              className={cx('lg:font-semibold', {
                'text-p-base': size === 'xs',
                'text-h-base': size === 'sm',
                'lg:text-h-md text-p-base': size === 'md',
                'text-h-lg': size === 'lg',
              })}
            >
              {secondTitle}
            </div>
            <div
              className={cx('flex items-center justify-center', {
                'w-10 h-10': accordionSize === 'lg',
                'w-8 h-8': accordionSize === 'md',
                'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
              })}
            >
              <ExpandMoreIcon
                className={cx('', {
                  'transform rotate-180': isActive,
                })}
                size={accordionSize}
              />
            </div>
          </button>
          {isActive && (
            <div
              className={cx('flex flex-col font-normal', {
                'text-h6': accordionSize === 'sm' || accordionSize === 'xs',
                'text-20': accordionSize === 'lg' || accordionSize === 'md',
              })}
            >
              <ReactMarkdown
                className={cx('flex flex-col gap-4', className)}
                remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
                rehypePlugins={[rehypeRaw, remarkDirective, remarkDirectiveRehype]}
                components={
                  {
                    h3: ({ children }: any) => <h3 className="text-h3 font-bold">{children}</h3>,
                    h4: ({ children }: any) => <h4 className="text-h4 font-bold">{children}</h4>,
                    h5: ({ children }: any) => <h5 className="text-h5 font-bold">{children}</h5>,
                    h6: ({ children }: any) => <h6 className="text-h6 font-bold">{children}</h6>,
                    ol: ({ children, ordered, ...props }: any) => (
                      <ol className="list-decimal pl-8" {...props}>
                        {children}
                      </ol>
                    ),
                    ul: ({ children, ordered, ...props }: any) => (
                      <ul className="list-disc pl-8" {...props}>
                        {children}
                      </ul>
                    ),
                    li: ({ children, ordered, ...props }: any) => <li {...props}>{children}</li>,
                    tooltip: Tooltip,
                    // without casting object to 'any' it throws an error TS
                  } as any
                }
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Accordion
