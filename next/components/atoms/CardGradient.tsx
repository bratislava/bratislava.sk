import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { generateImageSizes } from '@utils/generateImageSizes'
import cx from 'classnames'
import Image from 'next/image'
import React from 'react'

interface IProps {
  className?: string
  description?: React.ReactNode
  id: string
  url?: string
  mainImage: { id: string; src: string }
  title?: string
}

const CardGradient = ({ title, url, mainImage, className, description }: IProps) => {
  const { Link: UILink } = useUIContext()

  return (
    <UILink href={url ?? '#'}>
      <div
        className={cx(
          'group relative inline-block h-60 w-[348px] transform cursor-pointer rounded-lg pt-2 transition-all lg:h-76 lg:w-[395px] lg:hover:-translate-y-2 lg:hover:drop-shadow-lg',
          className,
        )}
      >
        <Image
          src={mainImage.src}
          className="h-full w-full rounded-lg object-cover"
          alt={title ?? ''}
          sizes={generateImageSizes({ lg: '395px', default: '348px' })}
          fill
        />
        {/* Gradient */}
        <div className="absolute bottom-0 flex h-56 w-full items-end rounded-b-lg bg-gradient-to-t from-[#000]">
          <div className="flex flex-col">
            {title && (
              <p className="text-h5 p-6 pb-0 text-white lg:pb-6 lg:group-hover:pb-3">{title}</p>
            )}
            {description && (
              <div className="block lg:hidden lg:group-hover:block">{description}</div>
            )}
          </div>
        </div>
      </div>
    </UILink>
  )
}

export default CardGradient
