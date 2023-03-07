// @ts-strict-ignore
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { NumericalListItem } from '@bratislava/ui-bratislava/NumericalListItem/NumericalListItem'
import cx from 'classnames'
import { isValidElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { LiProps } from 'react-markdown/lib/ast-to-react'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import ContentImage from './ContentImage'

export interface HomepageMarkdownProps {
  className?: string
  content?: string
  numericalList?: boolean
}

export type AdvancedListItemProps = LiProps & { depth?: number }

const getHeadingTag = (children) => {
  return typeof children[0] === 'string' ? children[0].split(' ').join('-') : ''
}

export const HomepageMarkdown = ({ className, content, numericalList }: HomepageMarkdownProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <ReactMarkdown
      className={cx(className, 'text-font', {
        'homepage-markdown': !numericalList,
        'numerical-list': numericalList,
      })}
      components={{
        h1: ({ children }) => (
          <h2 id={getHeadingTag(children)} className=".text-h1 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2
            id={getHeadingTag(children)}
            className="text-h2 mt-10 mb-6 scroll-mt-24 first:mt-0 last:mb-0 lg:scroll-mt-48"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={getHeadingTag(children)}
            className="text-h4-medium mt-10 mb-6 scroll-mt-24 first:mt-0 last:mb-0 lg:scroll-mt-48"
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4
            id={getHeadingTag(children)}
            className="text-h4 my-6 scroll-mt-24 first:mt-0 last:mb-0 lg:mt-10 lg:mb-6 lg:scroll-mt-48"
          >
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5
            id={getHeadingTag(children)}
            className="text-h4 mt-10 mb-6 scroll-mt-24 first:mt-0 last:mb-0 lg:scroll-mt-48"
          >
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6
            id={getHeadingTag(children)}
            className="text-h4 mt-10 mb-6 scroll-mt-24 first:mt-0 last:mb-0 lg:scroll-mt-48"
          >
            {children}
          </h6>
        ),
        p: ({ node, ...props }) => (
          <div className="text-p1 mb-4 whitespace-pre-wrap last:mb-0" {...props} />
        ),
        a: ({ href, children }) => (
          <UILink
            href={href ?? '#'}
            className="break-words font-semibold text-font underline hover:text-category-600"
            target={href?.startsWith('http') ? '_blank' : null}
          >
            {children[0]}
          </UILink>
        ),
        img: ({ src, alt }) => (
          <div className="flex justify-center">{src && <ContentImage src={src} alt={alt} />}</div>
        ),
        blockquote: ({ children }) => (
          <div className="mb-5 py-3 border-l-4 border-category-600 pl-10 last:mb-0 lg:my-10">
            {children}
          </div>
        ),
        table: ({ children }) => <table className="table-block w-full">{children}</table>,
        tr: ({ children }) => (
          <tr className="flex w-66 flex-col rounded-lg bg-white py-8 px-1 md:table-row md:w-full md:p-0 md:odd:bg-white md:even:bg-transparent">
            {children}
          </tr>
        ),
        tbody: ({ children }) => (
          <tbody className="flex gap-5 md:table-row-group md:gap-0">{children}</tbody>
        ),
        thead: () => <thead className="bg-transparent" />,
        td: ({ children }) => (
          <td className="first:rounded-l-lg last:rounded-r-lg">
            <div className="text-p1 md:min-h-24 mb-1 flex items-center px-4 text-left lg:mb-0">
              {children}
            </div>
          </td>
        ),
        ol: ({ children }) => {
          const elements = children
            .filter((e) => e !== '\n')
            .map((e) => {
              return (
                isValidElement(e) && {
                  ...e,
                  props: {
                    ...e.props,
                    children: e.props.children.filter((c: string) => c !== '\n'),
                  },
                }
              )
            })
          return <div className="my-6 flex flex-col first:mt-0 last:mb-0 lg:my-10">{elements}</div>
        },
        li: ({ ordered, children, index, depth }: AdvancedListItemProps) => {
          const level = depth ?? 0
          if (ordered) {
            return (
              <NumericalListItem index={index} variant="combined" hasBackground={false}>
                {children}
              </NumericalListItem>
            )
          }
          return (
            <div className="flex gap-x-8 lg:gap-x-6">
              <div
                className={cx(
                  'h-4 w-4 shrink-0 bg-category-600 rounded-full mt-1 border-4 border-solid border-category-600',
                  { 'bg-category-600': level === 0 },
                  { 'border-category-600 border-solid border-4': level !== 0 },
                )}
              />
              <div className="text-p1 whitespace-pre-wrap">{children}</div>
            </div>
          )
        },

        ul: ({ children, depth }) => {
          const elements = children.map((e) => {
            return isValidElement(e) ? { ...e, props: { ...e.props, depth } } : e
          })
          return (
            <ul className="inner-list my-6 flex flex-col gap-y-5 first:mt-0 last:mb-0 lg:my-10 lg:ml-6 lg:gap-y-8">
              {elements}
            </ul>
          )
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default HomepageMarkdown
