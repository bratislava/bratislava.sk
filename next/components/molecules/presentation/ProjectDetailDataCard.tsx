import CardBase from './CardBase'
import CardContent from './CardContent'

interface Props {
  label: string
  value: string
}

const ProjectDetailDataCard = ({ label, value }: Props) => (
  <CardBase variant={null} className="h-full bg-gray-50">
    <CardContent className="grow justify-between lg:p-4">
      <div className="flex flex-col">
        <h4 className="text-default line-clamp-3 ">{label}</h4>
        <div className="mt-2 line-clamp-4 text-font">{value}</div>
      </div>
    </CardContent>
  </CardBase>
)

export default ProjectDetailDataCard
