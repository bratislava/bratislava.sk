import cx from 'classnames'

import { ContentWrapper } from '../ContentWrapper/ContentWrapper'

export interface InfoCardProps {
  className?: string
  imageSrc?: string
  imageWidth: string
  imageHeight: string
  primaryTitle: string
  secondaryTitle: string
  description?: string
  children: React.ReactNode
}

export const InfoCard = ({
  className,
  imageSrc,
  imageWidth,
  imageHeight,
  primaryTitle,
  secondaryTitle,
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis turpis arcu, id ultricies sem tincidunt vitae.',
  children,
}: InfoCardProps) => {
  return (
    <div className={cx(className, 'flex w-18 max-w-sm flex-col items-start lg:w-full')}>
      {imageSrc && (
        <img alt={secondaryTitle} src={imageSrc} width={imageWidth} height={imageHeight} />
      )}
      <ContentWrapper
        className="mt-8 lg:pl-6"
        title={
          <h1 className="text-h4 text-category-600">
            {primaryTitle}
            <br />
            {secondaryTitle}
          </h1>
        }
      >
        <span className="text-p1 mb-8 mt-3 text-font">{description}</span>
        {children}
      </ContentWrapper>
    </div>
  )
}

export default InfoCard
