/* eslint-disable @typescript-eslint/no-unused-vars,jsx-a11y/heading-has-content */
import MLink from '@components/forms/simple-components/MLink'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export interface HomepageMarkdownProps {
  className?: string
  content: string | null | undefined
}

// TODO hasBackground behaviour
/**
 * See documentation: https://github.com/remarkjs/react-markdown#appendix-b-components
 *
 * @param className
 * @param content
 * @constructor
 */
const Markdown = ({ content }: HomepageMarkdownProps) => {
  return (
    <ReactMarkdown
      className="flex flex-col gap-4"
      components={{
        // Standard components: a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul

        // We don't want to use h1 in markdown, so it returns standard <p> tag
        h1: 'p',
        h2: ({ node, level, ...props }) => (
          <h2 className="text-h2 scroll-mt-24 lg:scroll-mt-48" {...props} />
        ),
        h3: ({ node, level, ...props }) => (
          <h3 className="text-h3 scroll-mt-24 lg:scroll-mt-48" {...props} />
        ),
        h4: ({ node, level, ...props }) => (
          <h4 className="text-h4 scroll-mt-24 lg:scroll-mt-48" {...props} />
        ),
        h5: ({ node, level, ...props }) => (
          <h5 className="text-h4-medium scroll-mt-24 lg:scroll-mt-48" {...props} />
        ),
        h6: ({ node, level, ...props }) => (
          <h6 className="text-h5 scroll-mt-24 lg:scroll-mt-48" {...props} />
        ),
        p: ({ node, ...props }) => <p className="text-p1 whitespace-pre-wrap" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
        a: ({ node, href, title, children, ...props }) => {
          const isExternal = href?.startsWith('http')

          return (
            <MLink
              href={href ?? '#'}
              className="break-words font-semibold text-font underline hover:text-category-600"
              target={href?.startsWith('http') ? '_blank' : undefined}
            >
              {children[0]}
              {/* TODO add external indicator */}
              {/* {isExternal && ' ↗'} */}
            </MLink>
          )
        },
        // TODO caption from Strapi, use <figure> and <figcaption> tags, see Marianum project
        img: ({ node, src, alt, title }) => (
          <div className="flex justify-center">{src && <img src={src} alt={alt} />}</div>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="my-4 border-l-4 border-category-600 py-2 pl-8" {...props} />
        ),
        ul: ({ node, depth, ...props }) => {
          return (
            <ul className={`inner-list ml-6 lg:ml-9 ${depth !== 0 ? 'mt-4' : ''}`} {...props} />
          )
        },
        ol: ({ node, depth, ordered, ...props }) => {
          return <ol className={`ml-12 lg:ml-16 ${depth === 0 ? 'mb-8' : ''}`} {...props} />
        },
        li: ({ node, index, ordered, children, ...props }) =>
          ordered ? (
            <li className="text-p1 relative mt-8 lg:mt-10" {...props}>
              {/* FIXME text-white on yellow and orange color */}
              <span
                className={cx(
                  'absolute -left-11 mt-[-3px] flex h-8 w-8 shrink-0 grow-0 items-center justify-center rounded-full bg-category-600 font-bold text-white lg:-left-16 lg:-mt-1.5 lg:h-10 lg:w-10',
                )}
              >
                {index + 1}
              </span>
              {children}
            </li>
          ) : (
            <li className="text-p1 relative not-first:mt-4" {...props}>
              <span
                className={cx(
                  'absolute left-[-22px] mt-[7px] h-2.5 w-2.5 shrink-0 grow-0 rounded-full border-3 border-category-600 bg-category-600 lg:-left-8 lg:mt-2 lg:h-3 lg:w-3',
                  // { 'border-category-600 bg-category-600': depth === 0 },
                  // { 'border-category-600 bg-white': depth === 1 },
                )}
              />
              {children}
            </li>
          ),

        // Remark-gfm components: del, input, table, tbody, td, th, thead, and tr
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
          <td className="first:text-p1-semibold text-p1 table-row md:table-cell">
            <div className="mb-1 flex items-center px-4 text-left md:min-h-[96px] lg:mb-0">
              {children}
            </div>
          </td>
        ),
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content ?? ''}
    </ReactMarkdown>
  )
}

export default Markdown
