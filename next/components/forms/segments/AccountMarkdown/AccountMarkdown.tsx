import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import Tooltip from 'components/forms/info-components/Tooltip/Tooltip'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

type AccountMarkdownBase = {
  className?: string
  content?: string
  variant?: 'sm' | 'normal'
  uLinkVariant?: 'primary' | 'default'
}

const TooltipComponent = ({ children }: never) => {
  return children ? <Tooltip text={children} position="top-right" /> : null
}

const AccountMarkdown = ({
  className,
  content,
  variant = 'normal',
  uLinkVariant = 'default',
}: AccountMarkdownBase) => {
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
            <li className="text-p1" {...props}>
              {children}
            </li>
          ),
          a: ({ href, children }: { href?: string; children?: string }) => (
            <UILink
              href={href ?? '#'}
              className={cx('break-words font-semibold  underline hover:text-category-600', {
                'text-white': uLinkVariant === 'primary',
                'text-font': uLinkVariant === 'default',
              })}
              target={href?.startsWith('http') ? '_blank' : ''}
            >
              {children}
            </UILink>
          ),
          tooltip: TooltipComponent,
          // without casting object to 'any' it throws an error TS
        } as any
      }
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default AccountMarkdown
