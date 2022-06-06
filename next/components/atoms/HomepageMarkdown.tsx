import cx from 'classnames';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useUIContext } from '@bratislava/common-frontend-ui-context';
import ContentImage from './ContentImage';
import remarkGfm from 'remark-gfm';
import { NumericalList } from '@bratislava/ui-bratislava/components/NumericalList/NumericalList';
import TurndownService from 'turndown';
import ReactDOMServer from 'react-dom/server';
import { OrderedListProps } from 'react-markdown/lib/ast-to-react';

export interface HomepageMarkdownProps {
  className?: string;
  content?: string;
  numericalList?: boolean;
  hasBackground?: boolean;
}

export const HomepageMarkdown = ({
  className,
  content,
  numericalList,
  hasBackground,
}: HomepageMarkdownProps) => {
  const { Link: UILink } = useUIContext();
  const getHeadingTag = (children) => {
    return typeof children[0] === 'string'
      ? children[0].split(' ').join('-')
      : '';
  };
  return (
    <ReactMarkdown
      className={cx(className, 'whitespace-pre-wrap text-font', {
        'homepage-markdown': !numericalList,
        'numerical-list': numericalList,
      })}
      components={{
        h1: ({ children }) => (
          <h2
            id={getHeadingTag(children)}
            className="scroll-mt-24 lg:scroll-mt-48 font-bold text-[48px] leading-[62.4px]"
          >
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2
            id={getHeadingTag(children)}
            className="scroll-mt-24 lg:scroll-mt-48 font-semibold text-2xl leading-[52px]"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={getHeadingTag(children)}
            className="scroll-mt-24 lg:scroll-mt-48 font-semibold text-lg leading-[41.6px]"
          >
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4
            id={getHeadingTag(children)}
            className="scroll-mt-24 lg:scroll-mt-48 font-medium text-md leading-[36px]"
          >
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5
            id={getHeadingTag(children)}
            className="scroll-mt-24 lg:scroll-mt-48 font-medium text-default leading-[30px]"
          >
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6
            id={getHeadingTag(children)}
            className="scroll-mt-24 lg:scroll-mt-48 font-normal text-sm leading-[24px]"
          >
            {children}
          </h6>
        ),
        p: ({ node, ...props }) => <div {...props} />,
        a: ({ href, children }) => (
          <UILink
            href={href ?? '#'}
            className="underline text-font font-semibold hover:text-primary"
          >
            {children[0]}
          </UILink>
        ),
        img: ({ src, alt }) => (
          <div className="flex justify-center">
            {src && <ContentImage src={src} alt={alt} />}
          </div>
        ),
        blockquote: ({ children }) => (
          <div className="border-l-4 border-primary pl-10">{children}</div>
        ),
        table: ({ children }) => <table className="w-full">{children}</table>,
        tr: ({ children }) => (
          <tr className="rounded-lg odd:bg-white even:bg-transparent">
            {children}
          </tr>
        ),
        thead: ({ children }) => <thead className="bg-transparent" />,
        td: ({ children }) => (
          <td className="first:rounded-l-lg last:rounded-r-lg">
            <div className="flex items-center text-default px-4 text-left min-h-[92px]">
              {children}
            </div>
          </td>
        ),
        ol: ({ children }: any) => {
          const turndownService = new TurndownService({ emDelimiter: '*' });
          const jsxStringItems = children
            .filter((e) => e?.type === 'li')
            .map((e) => ReactDOMServer.renderToStaticMarkup(e));
          const markdownItems = jsxStringItems.map((e) =>
            turndownService.turndown(e).slice(4)
          );
          const items = markdownItems.map((e) => {
            return { text: e };
          });
          return <NumericalList items={items} hasBackground={hasBackground} />;
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      children={content ?? ''}
    />
  );
};

export default HomepageMarkdown;
