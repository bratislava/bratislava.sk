import { useUIContext } from '@bratislava/common-frontend-ui-context';
import cx from 'classnames';
import { ReactComponent as ArrowRight } from '../../assets/images/arrow-right2.svg';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right2.svg';

export interface InstitutionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  content?: string[];
  url?: string;
  urlLabel?: string;
}

export const Institution = ({
  className,
  url,
  urlLabel,
  ...rest
}: InstitutionProps) => {
  const { Link: UILink } = useUIContext();

  return (
    <div className={cx(className, 'text-font')}>
      {url ? (
        <UILink href={url}>
          <InstitutionCard
            {...rest}
            className="hover:border-primary hover:border-opacity-100 group"
          >
            {urlLabel && (
              <div className="mt-6 flex items-center font-semibold underline">
                <span className="mr-5">{urlLabel}</span>
                <ChevronRight className="h-3 block group-hover:hidden" />
                <ArrowRight className="h-3 hidden group-hover:block" />
              </div>
            )}
          </InstitutionCard>
        </UILink>
      ) : (
        <InstitutionCard {...rest} />
      )}
    </div>
  );
};

interface InstitutionCardProps
  extends Pick<
    InstitutionProps,
    'className' | 'title' | 'subtitle' | 'content'
  > {
  children?: React.ReactNode;
}

const InstitutionCard = ({
  className,
  title,
  subtitle,
  content,
  children,
}: InstitutionCardProps) => {
  const { Markdown: UIMarkdown } = useUIContext();

  return (
    <div
      className={cx(
        className,
        'px-10 py-8 bg-white border-2 border-[rgba(51,51,51,0.25)] rounded-lg'
      )}
    >
      <div className="flex flex-col">
        <h4 className="font-semibold text-default leading-[26px]">{title}</h4>
        {subtitle && (
          <UIMarkdown className="mt-6 opacity-75" content={subtitle} />
        )}
        {content && (
          <div className="flex flex-row flex-wrap w-full mt-6 row">
            {Array.from(Array(3)).map((_, ix) => (
              <div
                key={ix}
                className="basis-4/12 col-12 md:col-4 mb-2 last:mb-0 md:mb-0"
              >
                {content[ix] && <UIMarkdown content={content[ix]} />}
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Institution;
