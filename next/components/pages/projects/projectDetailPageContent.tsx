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
const ProjectDetailPageContent = () => {
  const t = useTranslations()

  return (
    <>
      <PageHeader
        title="Udržateľné projekty v našom meste"
        breadcrumbs={breadcrumbs}
        imageSrc="https://source.unsplash.com/random"
      />

      <div className="mx-auto mb-8 mt-12 max-w-screen-xl px-4 lg:px-8">
        <div className="flex gap-36">
          <div className="flex-1">
            <h3 className="text-h4 mb-3 line-clamp-4">Popis projektu</h3>

            <p>
              Lorem ipsum dolor sit amet consectetur. Felis pellentesque blandit adipiscing at ipsum
              proin sapien nunc. Lacus at ac cras senectus lorem vulputate tempus morbi. Vulputate
              arcu orci in in phasellus sit. Ut vitae ultricies nunc erat est odio turpis faucibus
              phasellus. Velit et senectus eu interdum condimentum. Hendrerit venenatis laoreet non
              pulvinar at vitae sit at libero. Pellentesque purus pulvinar pellentesque senectus
              odio dictum lorem. Neque quam amet in iaculis scelerisque sed egestas feugiat.
              Convallis hendrerit semper purus duis sagittis eget duis. Eu tempor aenean risus
              feugiat massa consectetur duis. Vitae amet nunc erat amet semper accumsan. Consectetur
              massa lorem lacus pulvinar vitae. Eget habitant sit elit mattis et ornare cras in
              amet. Nibh nibh amet non a turpis cras lacus proin. Nulla velit pharetra nulla
              fringilla semper porta integer eu. Morbi pellentesque integer at adipiscing. Diam
              maecenas amet rhoncus justo. Aliquet et risus cras nunc molestie commodo. Dui posuere
              duis quis sapien viverra viverra interdum viverra. Felis accumsan massa odio faucibus
              ac fringilla gravida tristique. Rhoncus feugiat amet egestas aliquam odio dolor sit
              sagittis in. Habitasse interdum donec sed malesuada vestibulum molestie bibendum.
            </p>

            <div className="my-6 h-1 w-full border-b  border-gray-200" />

            <ProjectDetailDataSection data={[{ label: 'aaa', value: '123' }]} />

            <ProjectDetailTimelineSection timeline={['Plant a tree', 'Do something else']} />
          </div>
          <ProjectDetailCard />
        </div>
      </div>
    </>
  )
}

export default ProjectDetailPageContent
