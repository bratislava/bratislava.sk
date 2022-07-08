import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { NumericalListItem } from '@bratislava/ui-bratislava/NumericalListItem/NumericalListItem'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import ContentImage from './ContentImage'

export interface HomepageMarkdownProps {
  className?: string
  content?: string
  numericalList?: boolean
  hasBackground?: boolean
}

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
        table: ({ children }) => <table className="w-full">{children}</table>,
        tr: ({ children }) => <tr className="rounded-lg odd:bg-white even:bg-transparent">{children}</tr>,
        thead: ({ children }) => <thead className="bg-transparent" />,
        td: ({ children }) => (
          <td className="first:rounded-l-lg last:rounded-r-lg">
            <div className="flex min-h-[92px] items-center px-4 text-left text-default">{children}</div>
          </td>
        ),
        ol: ({ children }) => <div className="flex flex-col gap-y-0">{children}</div>,
        li: ({ ordered, children, index }) => {
          if (ordered) {
            return <NumericalListItem index={index} variant="combined" hasBackground={false} children={children} />
          }
          return (
            <div className="flex gap-x-8 lg:gap-x-6 items-center">
              <div className="h-4 w-4 shrink-0 bg-primary rounded-full" />
              <div>{children}</div>
            </div>
          )
        },
        ul: ({ children }) => {
          return <div className="flex flex-col gap-y-11 pl-6 pt-11">{children}</div>
        },
        // ol: (props: any) => {
        //   const { children } = props
        //   console.log('props', props)
        //   console.log('children', children)
        //   const turndownService = new TurndownService({ emDelimiter: '*' })

        //   const jsxStringItems = children
        //     .filter((e) => e?.type === 'li')
        //     .map((e) => ReactDOMServer.renderToStaticMarkup(e))
        //   console.log('jsxStringItems', jsxStringItems)
        //   const markdownItems = jsxStringItems.map((e) => turndownService.turndown(e).slice(4))
        //   const items = markdownItems.map((e) => {
        //     return { text: e }
        //   })
        //   console.log('items', items)
        //   const custom = markdownItems.map((e) => {
        //     const subs = e.split('*')
        //     return {
        //       text: subs[0],
        //       items: subs.slice(1),
        //     }
        //   })
        //   console.log('custom', custom)
        //   return <NumericalList items={items} hasBackground={hasBackground} />
        // },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      children={content ?? ''}
    />
  )
}

export default HomepageMarkdown
