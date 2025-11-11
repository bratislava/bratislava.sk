import { Typography } from '@bratislava/component-library'
import slugify from '@sindresorhus/slugify'
import Image from 'next/image'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import supersub from 'remark-supersub'
import remarkUnwrapImages from 'remark-unwrap-images'

import MLink from '@/src/components/common/MLink/MLink'
import { TABLE_OF_CONTENTS_HEADING_ATTRIBUTE } from '@/src/components/common/TableOfContents/useHeadings'
import cn from '@/src/utils/cn'

export type MarkdownProps = {
  content: string | null | undefined
  variant?: 'default' | 'small' | 'large' | 'accordion'
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

const Markdown = ({ content, variant = 'default', className }: MarkdownProps) => {
  return (
    <div
      {...TABLE_OF_CONTENTS_HEADING_ATTRIBUTE}
      className={cn(
        'markdown',
        {
          'text-size-p-large': variant === 'large',
          'text-size-p-default': variant === 'default' || variant === 'accordion',
          'text-size-p-small': variant === 'small',
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
        components={{
          // Standard components: a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul

          // We don't want to use h1 in markdown, so it returns standard <p> tag
          // Accordion uses h3 as its own heading, we want to display all the headings in markdown smaller or equal to h4.
          h1: 'p',
          h2: ({ children, node, ...props }) => (
            <Typography
              as="h2"
              variant={variant === 'accordion' ? 'h4' : 'h2'}
              id={typeof children === 'string' ? slugify(children) : undefined}
              {...props}
            >
              {children}
            </Typography>
          ),
          h3: ({ children, node, ...props }) => (
            <Typography as="h3" variant={variant === 'accordion' ? 'h5' : 'h3'} {...props}>
              {children}
            </Typography>
          ),
          h4: ({ children, node, ...props }) => (
            <Typography as="h4" variant={variant === 'accordion' ? 'h6' : 'h4'} {...props}>
              {children}
            </Typography>
          ),
          h5: ({ children, node, ...props }) => (
            <Typography variant="h5" {...props}>
              {children}
            </Typography>
          ),
          h6: ({ children, node, ...props }) => (
            <Typography variant="h6" {...props}>
              {children}
            </Typography>
          ),
          p: ({ children, node, ...props }) => {
            const variantMap = {
              default: 'p-default',
              small: 'p-small',
              large: 'p-large',
              accordion: 'p-default',
            } as const

            return (
              <Typography variant={variantMap[variant]} {...props}>
                {children}
              </Typography>
            )
          },
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
          img: ({ node, src, alt, title, ...props }) => {
            // this is a new feature behind a flag in React 19.1, this is to conform with the possible, if very unlikely, new type
            if (src instanceof Blob) {
              throw new Error(
                'Passed a Blob object into img src in Markdown. Blobs in src are not yet supported by Next.js Image component.',
              )
            }

            return (
              // Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/formatting/Markdown.tsx#L179
              // TODO Note from OLO: This can still produce a hydration error, because the remark-unwrap-images only works when image is the only child of the paragraph
              <figure className="flex flex-col items-center gap-4">
                <Image
                  {...props}
                  src={src ?? ''}
                  width="0"
                  height="0"
                  sizes="100vw"
                  alt={alt ?? ''}
                  className="h-auto w-full overflow-hidden rounded-xl"
                />
                {title ? (
                  <figcaption
                    aria-hidden={title === alt}
                    className="text-center text-size-p-small text-content-passive-tertiary"
                  >
                    {title}
                  </figcaption>
                ) : null}
              </figure>
            )
          },
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
