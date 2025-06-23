import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import MLink from '@/src/components/common/MLink/MLink'
import { DocumentsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: DocumentsSectionFragment
}

/**
 * Figma OLO: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=1932-18019&t=U7rn1Il95Xd9GkCS-0
 */
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

      {/* TODO implement proper row component https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=42-2243&t=U7rn1Il95Xd9GkCS-0 */}
      <ul className="flex flex-col rounded-lg border-2 py-2">
        {filteredDocuments
          .map((document, index) =>
            document.attributes ? (
              <Fragment key={document.id}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">
                  <MLink href={`/dokumenty/${document.attributes.slug}`} variant="underlined">
                    {document.attributes.title}
                  </MLink>
                </li>
              </Fragment>
            ) : null,
          )
          .filter(isDefined)}
      </ul>
    </div>
  )
}

export default DocumentsSection
