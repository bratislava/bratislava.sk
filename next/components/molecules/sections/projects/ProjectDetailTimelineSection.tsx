const TimelineItem = ({ name, index }) => (
  <div className="mb-4 flex items-center gap-3 last-of-type:mb-0 ">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 p-2 font-bold text-gray-0">
      {index + 1}
    </div>
    <span className="text-small flex-1 font-semibold text-gray-700">{name}</span>
  </div>
)

const ProjectDetailTimelineSection = ({ timeline }) => {
  return (
    <>
      <h3 className="text-h4 mb-3 line-clamp-4">Časová os projektu</h3>
      {timeline.map((item, index) => (
        <TimelineItem name={item} index={index} />
      ))}
    </>
  )
}

export default ProjectDetailTimelineSection
