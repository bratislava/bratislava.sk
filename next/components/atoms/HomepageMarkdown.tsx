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
  hasBackground?: boolean
}
export type AdvancedListItemProps = LiProps & { depth?: number }

export const HomepageMarkdown = ({ className, content, numericalList, hasBackground }: HomepageMarkdownProps) => {
  const { Link: UILink } = useUIContext()
  const getHeadingTag = (children) => {
    return typeof children[0] === 'string' ? children[0].split(' ').join('-') : ''
  }
  return (
    <ReactMarkdown
      className={cx(className, 'whitespace-pre-wrap text-font', {
        'homepage-markdown': !numericalList,
        'numerical-list': numericalList,
      })}
      components={{
        h1: ({ children }) => (
          <h2 id={getHeadingTag(children)} className=".typography-h1 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2 id={getHeadingTag(children)} className="typography-h2 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 id={getHeadingTag(children)} className="typography-h3 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 id={getHeadingTag(children)} className="typography-h4 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 id={getHeadingTag(children)} className="typography-h4 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 id={getHeadingTag(children)} className="typography-h4 scroll-mt-24 lg:scroll-mt-48">
            {children}
          </h6>
        ),
        p: ({ node, ...props }) => <div className="typography-regular" {...props} />,
        a: ({ href, children }) => (
          <UILink href={href ?? '#'} className="font-semibold text-font underline hover:text-primary">
            {children[0]}
          </UILink>
        ),
        img: ({ src, alt }) => <div className="flex justify-center">{src && <ContentImage src={src} alt={alt} />}</div>,
        blockquote: ({ children }) => <div className="border-l-4 border-primary pl-10">{children}</div>,
        table: ({ children }) => <table className="w-full table-block">{children}</table>,
        tr: ({ children }) => <tr className="py-8 px-1 md:p-0 w-[280px] md:w-full flex flex-col md:table-row rounded-lg bg-white md:odd:bg-white md:even:bg-transparent">{children}</tr>,
        tbody: ({ children }) => <tbody className="flex gap-5 md:gap-0 md:table-row-group" >{children}</tbody>,
        thead: ({ children }) => <thead className="bg-transparent" />,
        td: ({ children }) => (
          <td className="first:rounded-l-lg last:rounded-r-lg">
            <div className="flex md:min-h-[92px] items-center px-4 text-left text-sm md:text-default mb-1 lg:mb-0">{children}</div>
          </td>
        ),
        ol: ({ children }) => <div className="flex flex-col gap-y-0">{children}</div>,
        li: ({ ordered, children, index, depth }: AdvancedListItemProps) => {
          const level = depth ?? 0
          if (ordered) {
            return <NumericalListItem index={index} variant="combined" hasBackground={false} children={children} />
          }
          return (
            <div className="flex gap-x-8 lg:gap-x-6">
              <div
                className={cx(
                  'h-4 w-4 shrink-0 bg-primary rounded-full mt-1.5 border-4 border-solid border-primary',
                  { 'bg-primary': level == 0 },
                  { 'border-primary border-solid border-4': level != 0 }
                )}
              />
              <div>{children}</div>
            </div>
          )
        },

        ul: ({ children, depth }) => {
          const elements = children.map((e) => {
            return isValidElement(e) ? { ...e, props: { ...e.props, depth } } : e
          })
          return <div className="flex flex-col gap-y-6 lg:gap-y-11 lg:pl-6 pt-6 lg:pt-11 inner-list">{elements}</div>
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      children={content ?? ''}
    />
  )
}

export default HomepageMarkdown
