import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import TooltipComponent from 'components/forms/simple-components/Tooltip'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

type AccountMarkdownBase = {
  className?: string
  content?: string
}

const Tooltip = ({ children }: never) => {
  return <TooltipComponent tooltip={children} />
}

const AccountMarkdown = ({ className, content }: AccountMarkdownBase) => {
  const { Link: UILink } = useUIContext()
  return (
    <ReactMarkdown
      className={cx('flex flex-col gap-3', className)}
      remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
      rehypePlugins={[rehypeRaw, remarkDirective, remarkDirectiveRehype]}
      components={
        {
          h3: ({ children }: any) => <h3 className="text-h3">{children}</h3>,
          h4: ({ children }: any) => <h4 className="text-h4">{children}</h4>,
          h5: ({ children }: any) => <h5 className="text-h5">{children}</h5>,
          h6: ({ children }: any) => <h6 className="text-h6">{children}</h6>,
          p: ({ children }: any) => <p className="text-p1">{children}</p>,
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
          tooltip: Tooltip,
          // without casting object to 'any' it throws an error TS
        } as any
      }
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default AccountMarkdown
