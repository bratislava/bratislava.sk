import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import ProjectCard from '@components/molecules/presentation/ProjectCard'
import SearchField from 'components/forms/widget-components/SearchField/SearchField'
import { useTranslations } from 'next-intl'

const breadcrumbs = [
  {
    title: 'Životné prostredie a výstavba',
    path: '/zivotne-prostredie-a-vystavba',
  },
]
const ProjectsPageContent = () => {
  const t = useTranslations()

  return (
    <>
      <PageHeader title="Udržateľné projekty v našom meste" breadcrumbs={breadcrumbs} />

      <div className="mx-auto mt-8 max-w-screen-xl px-4 lg:px-8">
        <SearchField placeholder="Placeholder" />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 ">
          <ProjectCard title="title" text="Textas da sd a" />
          <ProjectCard title="title" />
          <ProjectCard title="title" />
          <ProjectCard title="title" />
        </div>

        <div className="mb-12 mt-8">
          <Pagination
            // totalCount={Math.ceil(documents.length / itemsPerPageDesktop)}
            totalCount={10}
            // currentPage={currentPage}
            currentPage={1}
            // onPageChange={setCurrentPage}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </>
  )
}

export default ProjectsPageContent
