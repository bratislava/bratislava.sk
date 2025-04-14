/* eslint-disable @typescript-eslint/no-unused-vars,jsx-a11y/heading-has-content */
import { Typography } from '@bratislava/component-library'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkUnwrapImages from 'remark-unwrap-images'

import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'

import styles from './Markdown.module.scss'

export type MarkdownProps = {
  content: string | null | undefined
  variant?: 'default' | 'small' | 'small-no-respo' | 'accordion'
  className?: string
}

/**
 * See documentation: https://github.com/remarkjs/react-markdown#appendix-b-components
 *
 * @param className
 * @param content
 * @param variant
 * @constructor
 *
 * This is the closest design we have:
 * https://www.figma.com/file/zVMiy9wMv6JYpab68Zm24A/DEPRECATED%3A-DS-ESBS%3A-Template-pages?type=design&node-id=19-2181&t=dkGyoRUm089BWYWu-0
 */

// FIXME Typography. Convert to Typography. Headers and p.
const Markdown = ({ content, variant = 'default', className }: MarkdownProps) => {
  return (
    <div
      className={cn(
        styles.markdown,
        {
          'text-large-respo': variant === 'default' || variant === 'accordion',
          'text-default-respo': variant === 'small',
          'text-default': variant === 'small-no-respo',
        },
        className,
      )}
    >
      <ReactMarkdown
        // Fixes non-functioning phone links - more at https://github.com/orgs/remarkjs/discussions/1329
        urlTransform={(url) => (url.startsWith('tel:') ? url : defaultUrlTransform(url))}
        remarkPlugins={[
          remarkUnwrapImages,
          [
            remarkGfm,
            // singleTilde is disabled to enable subscript: https://stackoverflow.com/a/78076200
            { singleTilde: false },
          ],
          supersub,
        ]}
        // TODO remove rehypeRaw
        rehypePlugins={[rehypeRaw]}
        components={{
          // Standard components: a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul

          // We don't want to use h1 in markdown, so it returns standard <p> tag
          // Accordion uses h3 as its own heading, we want to display all the headings in markdown smaller or equal to h4.
          h1: 'p',
          h2: ({ node, ...props }) => (
            <Typography
              type="h2"
              size={variant === 'accordion' ? 'h4' : 'h2'}
              {...props}
              data-cy="heading-two"
            />
          ),
          h3: ({ node, ...props }) => (
            <Typography type="h3" size={variant === 'accordion' ? 'h4' : 'h3'} {...props} />
          ),
          h4: ({ node, ...props }) => <h4 className="text-h4" {...props} />,
          h5: ({ node, ...props }) => <h5 className="text-h4 font-medium" {...props} />,
          h6: ({ node, ...props }) => <h6 className="text-h5" {...props} />,
          p: ({ node, ...props }) => (
            <Typography
              type="p"
              size={variant === 'small' ? 'p-small' : 'p-large'}
              className="whitespace-pre-wrap"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          a: ({ node, href, title, children, ...props }) => {
            const isExternal = href?.startsWith('http')

            return (
              <MLink
                variant="underlined-medium"
                href={href ?? '#'}
                target={isExternal ? '_blank' : undefined}
              >
                {!!children && children}
                {/* add nbsp and arrow to indicate external link */}
                {/* \u{0000FE0E} is Unicode variation selector that prevents symbols to be rendered as emojis on iOS
               https://stackoverflow.com/questions/8335724/unicode-characters-being-drawn-differently-in-ios5 */}
                {isExternal && `${String.fromCodePoint(160)}↗\u{0000FE0E}`}
              </MLink>
            )
          },
          // TODO caption from Strapi, use <figure> and <figcaption> tags, see Marianum project
          img: ({ node, src, alt, title, ...props }) => (
            <div className="flex justify-center">
              {src && <img src={src} alt={alt} {...props} />}
            </div>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-4 border-l-4 border-category-600 py-2 pl-8" {...props} />
          ),
          ol: ({ children, node, ...props }) => (
            <ol className="list-decimal pl-8 marker:text-content-secondary" {...props}>
              {children}
            </ol>
          ),
          ul: ({ children, node, ...props }) => (
            <ul className="list-disc pl-8 marker:text-content-secondary" {...props}>
              {children}
            </ul>
          ),
          li: ({ children, node, ...props }) => <li {...props}>{children}</li>,

          // Remark-gfm components: del, input, table, tbody, td, th, thead, and tr
          // FIXME tables need revisit - align, spacing, etc.
          table: ({ children, node, ...props }) => (
            <div className="overflow-x-auto rounded-lg border" {...props}>
              <table className="w-full table-auto">{children}</table>
            </div>
          ),
          thead: ({ children, node, ...props }) => <thead {...props}>{children}</thead>,
          tbody: ({ children, node, ...props }) => (
            <tbody {...props} className="border-t">
              {children}
            </tbody>
          ),
          tr: ({ children, node, ...props }) => (
            <tr className={cn('h-14 not-first:border-t')} {...props}>
              {children}
            </tr>
          ),
          td: ({ children, node, ...props }) => (
            <td className="px-5 py-1 not-first:border-l" {...props}>
              {children}
            </td>
          ),
          th: ({ children, node, ...props }) => (
            <th
              className="bg-background-secondary px-5 py-1 font-bold not-first:border-l"
              {...props}
            >
              {children}
            </th>
          ),
        }}
      >
        {content ?? ''}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
