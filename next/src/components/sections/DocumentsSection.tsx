import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import { DocumentsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: DocumentsSectionFragment
}

const DocumentsSection = ({ section }: Props) => {
  const { title, text, documents } = section

  const filteredDocuments = documents?.data.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title ? <Typography variant="h2">{title}</Typography> : null}
          {text ? <Typography variant="p-default">{text}</Typography> : null}
        </div>
      ) : null}

      {/* TODO implement */}
      <ul className="flex flex-col rounded-lg border-2 py-2">
        {filteredDocuments
          .map((document, index) =>
            document.attributes ? (
              <Fragment key={document.id}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">{document.attributes.title}</li>
              </Fragment>
            ) : null,
          )
          .filter(isDefined)}
      </ul>
    </div>
  )
}

export default DocumentsSection
