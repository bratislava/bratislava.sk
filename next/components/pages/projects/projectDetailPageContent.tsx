import { IProjectDetail } from '@backend/dtos/projectDto'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { ProjectDetailCard } from '@components/molecules/presentation/ProjectDetailCard'
import ProjectDetailDataSection from '@components/molecules/sections/projects/ProjectDetailDataSection'
import ProjectDetailTimelineSection from '@components/molecules/sections/projects/ProjectDetailTimelineSection'
import { useTranslations } from 'next-intl'

const breadcrumbs = [
  {
    title: 'Životné prostredie a výstavba',
    path: '/zivotne-prostredie-a-vystavba',
  },
]
const ProjectDetailPageContent = ({
  name,
  description,
  id,
  amount,
  place,
  phase,
  dateMonth,
  dateYear,
  thumbnail,
  votesCount,
  category,
}: IProjectDetail) => {
  const t = useTranslations()

  return (
    <>
      <PageHeader title={name} breadcrumbs={breadcrumbs} imageSrc={thumbnail} />

      <div className="mx-auto mb-8 mt-12 max-w-screen-xl px-4 lg:px-8">
        <div className="flex gap-28">
          <div className="flex-1">
            <h3 className="text-h4 mb-3 line-clamp-4">Popis projektu</h3>

            <p>{description}</p>

            <div className="my-6 h-1 w-full border-b  border-gray-200" />

            <ProjectDetailDataSection
              data={[
                { label: 'Hodnota projektu', value: amount },
                { label: 'Stav projektu', value: phase },
                { label: 'Kategória', value: category },
                { label: 'Mestská časť', value: place },
              ]}
            />

            <ProjectDetailTimelineSection timeline={['Plant a tree', 'Do something else']} />
          </div>
          <ProjectDetailCard
            id={id}
            dateMonth={dateMonth}
            dateYear={dateYear}
            votesCount={votesCount}
          />
        </div>
      </div>
    </>
  )
}

export default ProjectDetailPageContent
