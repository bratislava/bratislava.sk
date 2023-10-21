import { IProjectsQueryData } from '@backend/dtos/projectDto'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import Pagination from '@bratislava/ui-bratislava/Pagination/Pagination'
import ProjectCard from '@components/molecules/presentation/ProjectCard'
import SearchField from 'components/forms/widget-components/SearchField/SearchField'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

const itemsPerPageDesktop = 10
interface Props {
  data?: IProjectsQueryData
}

const breadcrumbs = [
  {
    title: 'Životné prostredie a výstavba',
    path: '/zivotne-prostredie-a-vystavba',
  },
]
const ProjectsPageContent = ({ data }: Props) => {
  const t = useTranslations()
  const router = useRouter()

  const { total, currentPage } = data.paginationInfo

  const onChangePage = async (page: number) => {
    await router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    })
  }

  return (
    <>
      <PageHeader title="Udržateľné projekty v našom meste" breadcrumbs={breadcrumbs} />

      <div className="mx-auto mt-8 max-w-screen-xl px-4 lg:px-8">
        <SearchField placeholder="Placeholder" />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 ">
          {data?.projects?.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <div className="mb-12 mt-8">
          <Pagination
            totalCount={Math.ceil(total / itemsPerPageDesktop)}
            currentPage={+currentPage}
            onPageChange={onChangePage}
          />
        </div>
      </div>
    </>
  )
}

export default ProjectsPageContent
