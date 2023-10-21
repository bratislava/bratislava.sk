import ProjectDetailDataCard from '@components/molecules/presentation/ProjectDetailDataCard'

const ProjectDetailDataSection = ({ data }) => {
  return (
    <>
      <h3 className="text-h4 mb-3 line-clamp-4">Dáta</h3>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <ProjectDetailDataCard label="Suma projektu" value="10000eur" />
        <ProjectDetailDataCard label="Suma projektu" value="10000eur" />
        <ProjectDetailDataCard label="Suma projektu" value="10000eur" />
      </div>
    </>
  )
}

export default ProjectDetailDataSection
