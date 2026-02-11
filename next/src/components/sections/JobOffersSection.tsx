import React, { Fragment } from 'react'

import JobOfferRowCard from '@/src/components/cards/JobOfferRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { JobOffersSectionFragment } from '@/src/services/graphql'

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
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18771-16152&t=7BaHype1nMgzyjER-4
 */

type JobOffersSectionProps = { section: JobOffersSectionFragment }

const JobOffersSection = ({ section }: JobOffersSectionProps) => {
  const { title, text } = section

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
                  <JobOfferRowCard jobOffer={jobOffer} />
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
