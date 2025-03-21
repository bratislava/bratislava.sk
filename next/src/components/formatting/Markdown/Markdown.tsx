/* eslint-disable @typescript-eslint/no-unused-vars,jsx-a11y/heading-has-content */
import { Typography } from '@bratislava/component-library'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'

import styles from './Markdown.module.scss'

export type MarkdownProps = {
  content: string | null | undefined
  variant?: 'default' | 'small' | 'small-no-respo' | 'accordion'
}

/**
 * See documentation: https://github.com/remarkjs/react-markdown#appendix-b-components
 *
 * @param className
 * @param content
 * @constructor
 *
 * This is the closest design we have:
 * https://www.figma.com/file/zVMiy9wMv6JYpab68Zm24A/DEPRECATED%3A-DS-ESBS%3A-Template-pages?type=design&node-id=19-2181&t=dkGyoRUm089BWYWu-0
 */

// FIXME Typography. Convert to Typography. Headers and p.
const Markdown = ({ content, variant = 'default' }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={cn(styles.markdown, {
        'text-large-respo': variant === 'default' || variant === 'accordion',
        'text-default-respo': variant === 'small',
        'text-default': variant === 'small-no-respo',
      })}
      components={{
        // Standard components: a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul

        // We don't want to use h1 in markdown, so it returns standard <p> tag
        // Accordion uses h3 as its own heading, we want to display all the headings in markdown smaller or equal to h4.
        h1: 'p',
        h2: ({ node, level, ...props }) => (
          <Typography
            type="h2"
            size={variant === 'accordion' ? 'h4' : 'h2'}
            {...props}
            data-cy="heading-two"
          />
        ),
        h3: ({ node, level, ...props }) => (
          <Typography type="h3" size={variant === 'accordion' ? 'h4' : 'h3'} {...props} />
        ),
        h4: ({ node, level, ...props }) => <h4 className="text-h4" {...props} />,
        h5: ({ node, level, ...props }) => <h5 className="text-h4 font-medium" {...props} />,
        h6: ({ node, level, ...props }) => <h6 className="text-h5" {...props} />,
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
              {children[0]}
              {/* add nbsp and arrow to indicate external link */}
              {/* \u{0000FE0E} is Unicode variation selector that prevents symbols to be rendered as emojis on iOS
               https://stackoverflow.com/questions/8335724/unicode-characters-being-drawn-differently-in-ios5 */}
              {isExternal && `${String.fromCodePoint(160)}↗\u{0000FE0E}`}
            </MLink>
          )
        },
        // TODO caption from Strapi, use <figure> and <figcaption> tags, see Marianum project
        img: ({ node, src, alt, title, ...props }) => (
          <div className="flex justify-center">{src && <img src={src} alt={alt} {...props} />}</div>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="my-4 border-l-4 border-category-600 py-2 pl-8" {...props} />
        ),
        // `ordered` should not be passed to <ul>
        ul: ({ node, depth, ordered, ...props }) => {
          return <ul {...props} />
        },
        // `ordered` should not be passed to <ol>
        ol: ({ node, depth, ordered, ...props }) => {
          return <ol className="[counter-reset:list-number-styling]" {...props} />
        },
        li: ({ node, index, ordered, children, ...props }) =>
          ordered ? (
            <li
              className="flex [counter-increment:list-number-styling] before:mr-3 before:inline-flex before:h-8 before:w-8 before:shrink-0 before:items-center before:justify-center before:rounded-full before:bg-category-600 before:font-bold before:text-white before:content-[counter(list-number-styling)_'.'] before:lg:mr-6 before:lg:h-10 before:lg:w-10"
              {...props}
            >
              {/* Markdown class replicates the nested behavior */}
              <span className={`${styles.markdown} mt-1 lg:mt-1.5`}>{children}</span>
            </li>
          ) : (
            <li
              className="flex before:mr-3 before:mt-2 before:h-2.5 before:w-2.5 before:shrink-0 before:rounded-full before:bg-category-600 before:lg:mr-6 before:lg:h-3 before:lg:w-3"
              {...props}
            >
              {/* Markdown class replicates the nested behavior */}
              <span className={`${styles.markdown}`}>{children}</span>
            </li>
          ),

        // Remark-gfm components: del, input, table, tbody, td, th, thead, and tr
        // FIXME tables need revisit - align, spacing, etc.
        table: ({ node, children }) => (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">{children}</table>
          </div>
        ),
        tr: ({ node, children }) => (
          <tr className="mb-4 table w-full md:mb-0 md:table-row">{children}</tr>
        ),
        tbody: ({ node, children }) => <tbody>{children}</tbody>,
        thead: () => <thead />,
        td: ({ node, children }) => (
          <td className="text-large-respo table-row md:table-cell">
            <div className="mb-1 flex items-center pr-4 text-left md:mb-0 md:py-1">{children}</div>
          </td>
        ),
        // th: ...
      }}
      remarkPlugins={[remarkGfm, remarkUnwrapImages]}
      rehypePlugins={[rehypeRaw]}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default Markdown
