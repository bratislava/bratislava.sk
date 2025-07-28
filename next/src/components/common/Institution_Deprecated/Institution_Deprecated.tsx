import { Typography } from '@bratislava/component-library'
import { useId } from 'react'

import Button from '@/src/components/common/Button/Button'
import Markdown from '@/src/components/formatting/Markdown/Markdown'

export type InstitutionProps = {
  title?: string
  subtitle?: string
  content?: string[]
  url?: string
  urlLabel?: string
}

const Institution = ({ title, subtitle, content, url, urlLabel }: InstitutionProps) => {
  const titleId = useId()

  return (
    <div className="relative h-full rounded-lg border border-[rgba(51,51,51,0.25)] bg-white p-8">
      <div className="flex flex-col">
        <Typography variant="h5" as="h4" id={titleId} className="text-h5">
          {title}
        </Typography>

        {subtitle && <Markdown content={subtitle} />}
        {content?.length && (
          <div className="mt-6 grid w-full grid-cols-1 gap-8 md:auto-cols-fr md:grid-flow-col">
            {content.map((contentCol, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Markdown key={index} content={contentCol} />
            ))}
          </div>
        )}
        {urlLabel && url && (
          <Button href={url} variant="link" className="mt-6" aria-labelledby={titleId}>
            {urlLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Institution
