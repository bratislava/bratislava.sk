import cx from 'classnames'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

import ExpandMoreIcon from '../icon-components/ExpandMoreIcon'
import PersonIcon from '../icon-components/PersonIcon'
import TooltipComponent from './Tooltip'

const Tooltip = ({ children }: never) => {
  return <TooltipComponent tooltip={children} />
}
export type AccordionSizeType = 'sm' | 'md' | 'lg'

type AccordionBase = {
  size: AccordionSizeType
  title: string
  markdownContent: string
  icon?: boolean
  shadow?: boolean
  className?: string
}

const Accordion = ({
  title,
  markdownContent,
  size = 'sm',
  icon = false,
  shadow = false,
  className,
}: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionContainerStyle = cx('flex flex-col gap-4 w-full rounded-xl bg-gray-0', className, {
    'p-5': size === 'sm',
    'py-6 px-8': size === 'md',
    'py-8 px-10': size === 'lg',
    'border-gray-200': !isActive && !shadow,
    'border-gray-700': isActive && !shadow,
    'border-2 border-solid hover:border-gray-500': !shadow,
    'hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.08)]': shadow,
    'shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]': !isActive && shadow,
  })

  return (
    <div className={accordionContainerStyle}>
      <div className={cx('flex gap-4', {})}>
        {icon && (
          <div
            className={cx('flex items-center justify-center', {
              'w-6 h-6': size === 'sm',
              'w-8 h-8': size === 'md',
              'w-10 h-10': size === 'lg',
            })}
          >
            <PersonIcon
              className={cx('', {
                'w-4 h-4': size === 'sm',
                'w-5 h-5': size === 'md',
                'w-6 h-6': size === 'lg',
              })}
            />
          </div>
        )}
        <div className="flex w-full flex-col">
          <div
            className="flex w-full items-center cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={cx('font-semibold not-italic w-full', {
                'text-h-base': size === 'sm',
                'text-h-md': size === 'md',
                'text-h-lg': size === 'lg',
              })}
            >
              {title}
            </div>
            <div
              className={cx('flex items-center justify-center', {
                'w-10 h-10': size === 'lg',
                'w-8 h-8': size === 'md',
                'w-6 h-6': size === 'sm',
              })}
            >
              <ExpandMoreIcon
                className={cx('', {
                  'transform rotate-180': isActive,
                })}
                size={size}
              />
            </div>
          </div>
          {isActive && (
            <div
              className={cx('flex flex-col font-normal not-italic', {
                'text-h-sm': size === 'sm',
                'text-p-md': size === 'lg' || size === 'md',
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
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Accordion
