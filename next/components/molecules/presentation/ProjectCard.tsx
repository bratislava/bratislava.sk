import { ExportIcon } from '@assets/ui-icons'
import Divider from '@bratislava/ui-bratislava/Divider/Divider'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import Button from '@components/forms/simple-components/Button'
import Tag from '@components/forms/simple-components/Tag'
import Image from 'next/image'

import CardBase, { CardBaseProps } from './CardBase'
import CardContent from './CardContent'

type Props = {
  title: string
  imgSrc?: string
  imgSizes?: string
  date?: string
  text?: string
} & CardBaseProps

const ProjectCard = ({ id, imgSizes, imgSrc, title, text, ...rest }: Props) => {
  return (
    <CardBase variant={null} className="h-full bg-gray-50" {...rest}>
      <div className="relative aspect-16/10 shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between">
        <div className="flex flex-col">
          <h3 className="text-h4 line-clamp-3 group-hover:underline">{title}</h3>
          {text && <div className="mt-1 line-clamp-4 text-font">{text}</div>}
        </div>

        <div className="mb-2 mt-4 flex items-center justify-between">
          <div className="text-default font-semibold leading-[1.5rem] text-font ">
            Suma projektu
          </div>
          <div className="text-default font-semibold leading-[1.5rem] text-font ">10000eur</div>
        </div>

        <div className="flex items-center justify-between pb-4">
          <div className="text-default font-semibold leading-[1.5rem] text-font ">
            Rok realizacie
          </div>
          <div className="text-default font-semibold leading-[1.5rem] text-font ">2023</div>
        </div>

        <div className="h-1 w-full border-b" />

        <Button
          variant="black-link"
          stretched
          href={`/udrzatelne-projekty/${id}`}
          className="mt-3 no-underline lg:mt-5"
          endIcon={<ExportIcon />}
        >
          Viac o projekte
        </Button>
      </CardContent>
    </CardBase>
  )
}

export default ProjectCard
