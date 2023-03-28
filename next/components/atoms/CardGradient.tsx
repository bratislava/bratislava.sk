// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { TImageCarouselItem } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

interface IProps extends TImageCarouselItem {
  className?: string
  description?: React.ReactNode
}

const CardGradient = ({ title, url, mainImage, className, description }: IProps) => {
  const { Link: UILink } = useUIContext()

  return (
    <UILink href={url}>
      <div
        className={cx(
          'group relative inline-block h-60 transform cursor-pointer rounded-lg pt-2 transition-all lg:h-76 lg:hover:-translate-y-2 lg:hover:drop-shadow-lg',
          className,
        )}
      >
        <img src={mainImage.src} className="h-full w-full rounded-lg object-cover" alt={title} />
        {/* Gradient */}
        <div className="absolute bottom-0 flex h-56 w-full items-end rounded-b-lg bg-gradient-to-t from-[#000]">
          <div className="flex flex-col">
            {title && (
              <p className="text-h5 p-6 pb-0 text-white lg:pb-6 lg:group-hover:pb-3">{title}</p>
            )}
            {description && <p className="block lg:hidden lg:group-hover:block">{description}</p>}
          </div>
        </div>
      </div>
    </UILink>
  )
}

export default CardGradient
