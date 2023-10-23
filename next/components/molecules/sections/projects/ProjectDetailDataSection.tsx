import ProjectDetailDataCard from '@components/molecules/presentation/ProjectDetailDataCard'
import { useTranslations } from 'next-intl'

const ProjectDetailDataSection = ({ data }) => {
  const t = useTranslations()

  return (
    <>
      <h3 className="text-h4 mb-3 line-clamp-4">{t('data')}</h3>

      <div className="mb-8 grid  grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((item) => (
          <ProjectDetailDataCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </>
  )
}

export default ProjectDetailDataSection
