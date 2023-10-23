import { ExportIcon } from '@assets/ui-icons'
import { IProject } from '@backend/dtos/projectDto'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import Button from '@components/forms/simple-components/Button'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import CardBase from './CardBase'
import CardContent from './CardContent'

const ProjectCard = ({ id, name, thumbnail, dateYear, place, amount }: IProject) => {
  const t = useTranslations()

  return (
    <CardBase variant={null} className="h-full bg-gray-50">
      <div className="relative aspect-16/10 shrink-0">
        {thumbnail ? (
          <Image src={thumbnail} alt={name} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between">
        <div className="flex flex-col">
          <h3 className="text-h4 line-clamp-3 group-hover:underline">{name}</h3>
          {place && <div className="mt-1 line-clamp-4 text-font">{place}</div>}
        </div>

        <div className="mb-2 mt-4 flex items-center justify-between">
          <div className="text-default font-semibold leading-[1.5rem] text-font ">
            {t('projectPrice')}
          </div>
          <div className="text-default font-semibold leading-[1.5rem] text-font ">{amount} €</div>
        </div>

        <div className="flex items-center justify-between pb-4">
          <div className="text-default font-semibold leading-[1.5rem] text-font ">
            {t('yearOfProject')}
          </div>
          <div className="text-default font-semibold leading-[1.5rem] text-font ">{dateYear}</div>
        </div>

        <div className="h-1 w-full border-b" />

        <Button
          variant="black-link"
          stretched
          href={`/udrzatelne-projekty/${id}`}
          className="mt-3 no-underline lg:mt-5"
          endIcon={<ExportIcon />}
        >
          {t('moreAboutProject')}
        </Button>
      </CardContent>
    </CardBase>
  )
}

export default ProjectCard
