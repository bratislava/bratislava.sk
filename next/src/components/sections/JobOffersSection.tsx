import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import { ChevronRightIcon } from '@/src/assets/icons'
import CardBase from '@/src/components/cards/CardBase'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { JobOfferListSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

const jobOfferMock = [
  {
    id: 82266,
    title: 'Koordinátor/ka LinkedIn astrategickej komunikácie mesta- práca na dohodu',
    language: 'sk',
    featured: false,
    publishedOn: '2026-02-02T10:27:42+01:00',
    updatedOn: '2026-02-10T14:38:18+01:00',
    url: 'https://bratislava.nalgoo-jobs.com/jobs/82266',
    location: 'Bratislava',
    salary: null,
    salaryInfo: 'Hodinová mzda:  8,00 €',
    employmentForms: [{ id: 3, name: 'Práca na dohodu' }],
    fields: [],
  },
  {
    id: 82344,
    title:
      'Asistent/ka pre komunikáciu s mestskými časťami a poslancami- práca na dohodu - Asistent/ka pre komunikáciu s mestskými časťami a poslancami- práca na dohodu ',
    language: 'sk',
    featured: false,
    publishedOn: '2026-02-02T12:42:53+01:00',
    updatedOn: '2026-02-10T14:37:40+01:00',
    url: 'https://bratislava.nalgoo-jobs.com/jobs/82344',
    location: 'Bratislava',
    salary: null,
    salaryInfo: 'Hodinová mzda: 8,00 €',
    employmentForms: [{ id: 3, name: 'Práca na dohodu' }],
    fields: [],
  },
  {
    id: 82728,
    title: 'Terénny pracovník/čka  v programe Mládež',
    language: 'sk',
    featured: false,
    publishedOn: '2026-02-10T10:19:20+01:00',
    updatedOn: '2026-02-10T11:19:03+01:00',
    url: 'https://bratislava.nalgoo-jobs.com/jobs/82728',
    location: 'Lazaretská 12., Bratislava',
    salary: '1500 EUR/mes',
    salaryInfo: 'od 1500 EUR/mes.  v závislosti od pracovných schopností, praxe a skúseností ',
    employmentForms: [{ id: 1, name: 'Plný úväzok' }],
    fields: [],
  },
]

/**
 * TODO: add Figma link to Component library
 * Figma: https://www.figma.com/design/A9aoQH2FGhR1D14wvvk6FW/Mestsk%C3%BD-web--bratislava.sk-?node-id=3331-7668&t=42jF8eIC6pPGhocy-4
 */

type JobOffersSectionProps = { section: JobOfferListSectionFragment }

const JobOffersSection = ({ section }: JobOffersSectionProps) => {
  const { title, text, titleLevel } = section

  return (
    <SectionContainer>
      <div className="flex w-full flex-col gap-6">
        <SectionHeader title={title} text={text} />
        <ul className="flex flex-col rounded-lg border">
          {jobOfferMock.map((jobOffer, index) => {
            return (
              <Fragment key={jobOffer.id}>
                {index > 0 ? <HorizontalDivider asListItem /> : null}
                <li className="w-full p-1">
                  <CardBase
                    variant="no-border"
                    className="group flex flex-row px-5 py-3 ring-inset"
                  >
                    <div className="flex w-full flex-col gap-3">
                      <Typography
                        variant="h5"
                        as={getCardTitleLevel(titleLevel)}
                        className="group-hover:underline"
                      >
                        {jobOffer.title}
                      </Typography>

                      <div className="flex gap-2">
                        <Typography variant="p-small">
                          {[jobOffer.location, jobOffer.salary || jobOffer.salaryInfo]
                            .filter(isDefined)
                            .join(' • ')}
                        </Typography>
                      </div>
                    </div>

                    <Button
                      href={jobOffer.url}
                      aria-label={jobOffer.title}
                      stretched
                      icon={<ChevronRightIcon />}
                      hasLinkIcon={false}
                      className="self-center whitespace-nowrap"
                    />
                  </CardBase>
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default JobOffersSection
