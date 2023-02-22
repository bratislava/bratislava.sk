import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import Tooltip from 'components/forms/info-components/Tooltip/Tooltip'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

type AccountMarkdownBase = {
  className?: string
  content?: string
  variant?: 'sm' | 'normal'
}

const TooltipComponent = ({ children }: never) => {
  return children ? <Tooltip text={children} position="top-right" /> : null
}

const AccountMarkdownTable = ({ content, variant = 'normal', className }: AccountMarkdownBase) => {
  const { Link: UILink } = useUIContext()
  return (
    <ReactMarkdown
      className={cx('flex flex-col gap-3 w-full', className)}
      remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
      rehypePlugins={[rehypeRaw, remarkDirective, remarkDirectiveRehype]}
      components={
        {
          h3: ({ children }: any) => <h3 className="text-h3">{children}</h3>,
          h4: ({ children }: any) => <h4 className="text-h4">{children}</h4>,
          h5: ({ children }: any) => <h5 className="text-h5">{children}</h5>,
          h6: ({ children }: any) => <h6 className="text-h6">{children}</h6>,
          p: ({ children }: any) => (
            <p className={variant === 'sm' ? 'text-p3 lg:text-p2' : 'text-p1'}>{children}</p>
          ),
          strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
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
          li: ({ children, ordered, ...props }: any) => (
            <li className="text-p2" {...props}>
              {children}
            </li>
          ),
          a: ({ href, children }: { href?: string; children?: string }) => (
            <UILink
              href={href ?? '#'}
              className="break-words font-semibold text-font underline hover:text-category-600"
              target={href?.startsWith('http') ? '_blank' : ''}
            >
              {children}
            </UILink>
          ),
          table: ({ children }: never) => {
            return (
              <div className="overflow-x-auto w-full">
                <table className="rounded-lg border-separate border-spacing-0 border-2 border-solid border-gray-200 lg:border-0 lg:w-full w-max table-auto">
                  {children}
                </table>
              </div>
            )
          },
          th: ({ children }: never) => {
            return (
              <th className="text-16 first:rounded-tl last:rounded-tr [&:not(:first-child)]:text-center border-spacing-0 border-b-2 text-left sm:py-4 pr-4">
                {children}
              </th>
            )
          },
          td: ({ children }: never) => {
            return (
              <td className="[&:not(:first-child)]:text-20-semibold border-r-2 [&:not(:first-child)]:text-center py-2 last:border-r-0 ">
                {children}
              </td>
            )
          },
          tr: ({ children }: never) => {
            return <tr className="last:border-b-2">{children}</tr>
          },
          thead: ({ children }: never) => {
            return <thead className="lg:bg-gray-0 bg-gray-200">{children}</thead>
          },
          tooltip: TooltipComponent,
          // without casting object to 'any' it throws an error TS
        } as any
      }
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default AccountMarkdownTable
