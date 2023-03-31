import ArrowRight from '@assets/images/arrow-right2.svg'
import ChevronRight from '@assets/images/chevron-right2.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import HomepageMarkdown from '@components/atoms/HomepageMarkdown'
import cx from 'classnames'

export interface InstitutionProps {
  className?: string
  title?: string
  subtitle?: string
  content?: string[]
  url?: string
  urlLabel?: string
}

const InstitutionCard = ({
  className,
  title,
  subtitle,
  content,
  children,
}: InstitutionCardProps) => {
  return (
    <div
      className={cx(
        className,
        'h-full rounded-lg border-2 border-[rgba(51,51,51,0.25)] bg-white px-8 py-8',
      )}
    >
      <div className="flex flex-col">
        <h4 className="text-20-semibold leading-[26px]">{title}</h4>
        {subtitle && (
          <HomepageMarkdown
            // className="fontSize-base text-16 mt-6"
            content={subtitle}
          />
        )}
        {content && (
          <div className="row mt-6 flex w-full flex-row flex-wrap">
            {[...Array.from({ length: 3 })].map((_, ix) => (
              <div
                key={ix}
                className="col-12 md:col-4 fontSize-base mb-2 break-words last:mb-0 md:mb-0"
              >
                {content[ix] && <HomepageMarkdown content={content[ix]} />}
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export const Institution = ({ className, url, urlLabel, ...rest }: InstitutionProps) => {
  const { Link: UILink } = useUIContext()

  return (
    <div className={cx(className, 'text-font')}>
      {url ? (
        <UILink href={url}>
          <InstitutionCard {...rest} className="group hover:border-category-600">
            {urlLabel && (
              <div className="text-p2-semibold mt-6 flex items-center underline">
                <span className="mr-5">{urlLabel}</span>
                <ChevronRight className="block h-3 group-hover:hidden" />
                <ArrowRight className="hidden h-3 group-hover:block" />
              </div>
            )}
          </InstitutionCard>
        </UILink>
      ) : (
        <InstitutionCard {...rest} />
      )}
    </div>
  )
}

interface InstitutionCardProps
  extends Pick<InstitutionProps, 'className' | 'title' | 'subtitle' | 'content'> {
  children?: React.ReactNode
}

export default Institution
