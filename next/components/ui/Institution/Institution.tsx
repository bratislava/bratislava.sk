import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import ArrowRight from '../../../assets/images/arrow-right2.svg'
import ChevronRight from '../../../assets/images/chevron-right2.svg'

export interface InstitutionProps {
  className?: string
  title?: string
  subtitle?: string
  content?: string[]
  url?: string
  urlLabel?: string
}

export const Institution = ({ className, url, urlLabel, ...rest }: InstitutionProps) => {
  const { Link: UILink } = useUIContext()

  return (
    <div className={cx(className, 'text-font')}>
      {url ? (
        <UILink href={url}>
          <InstitutionCard {...rest} className="group hover:border-primary hover:border-opacity-100">
            {urlLabel && (
              <div className="mt-6 flex items-center font-semibold underline">
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

interface InstitutionCardProps extends Pick<InstitutionProps, 'className' | 'title' | 'subtitle' | 'content'> {
  children?: React.ReactNode
}

const InstitutionCard = ({ className, title, subtitle, content, children }: InstitutionCardProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  return (
    <div className={cx(className, 'px-10 py-8 bg-white border-2 border-[rgba(51,51,51,0.25)] rounded-lg')}>
      <div className="flex flex-col">
        <h4 className="text-default font-semibold leading-[26px]">{title}</h4>
        {subtitle && <UIMarkdown className="mt-6 opacity-75" content={subtitle} />}
        {content && (
          <div className="row mt-6 flex w-full flex-row flex-wrap">
            {[...Array.from({length: 3})].map((_, ix) => (
              <div key={ix} className="col-12 md:col-4 mb-2 basis-4/12 last:mb-0 md:mb-0">
                {content[ix] && <UIMarkdown content={content[ix]} />}
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default Institution
