import { useState, useEffect, useRef, RefObject } from 'react'
import cx from 'classnames'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ChevronRight, ArrowRight } from '../../../assets/images'
import { Button } from '../Button/Button'
import { Tag } from '../Tag/Tag'
import { VerticalCard } from '../VerticalCard/VerticalCard'
import moment from 'moment'

export interface NewsCardProps {
  className?: string
  readMoreText?: string
  coverImage?: {
    data? : {
      attributes? : {
        url?: string | null
      }
    }
  }
  tag?: {
    data?: {
      attributes?: {
        title?: string | null
        pageCategory?: {
          data?: {
            attributes?: {
              color?: string | null
            }
          }
        }
      }
    }
  }
  title?: string | null
  excerpt?: string | null
  date_added?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  slug?: string | null
  link?: string | null
}

export const NewsCard = ({
  className,
  coverImage,
  tag,
  title,
  excerpt,
  updatedAt,
  date_added,
  readMoreText,
  slug,
}: NewsCardProps) => {
  const { Link: UILink } = useUIContext()
  const [isHover, setHover] = useState(false)
  const cardRef: RefObject<HTMLInputElement> = useRef()

  const enterListner = () => setHover(true)
  const exitListner = () => setHover(false)

  useEffect(() => {
    if (cardRef?.current) {
      cardRef?.current.addEventListener('mouseenter', enterListner)
      cardRef?.current.addEventListener('mouseleave', exitListner)
    }
    return () => {
      cardRef?.current?.removeEventListener('mouseenter', enterListner)
      cardRef?.current?.removeEventListener('mouseleave', exitListner)
    }
  }, [])

  // TODO inject these from outside instead of useTranslation - react-i18n break the next app build
  // const { t } = useTranslation('common');

  useEffect(() => {
    if (cardRef?.current) {
      cardRef?.current.addEventListener('mouseenter', enterListner)
      cardRef?.current.addEventListener('mouseleave', exitListner)
    }
    return () => {
      cardRef?.current?.removeEventListener('mouseenter', enterListner)
      cardRef?.current?.removeEventListener('mouseleave', exitListner)
    }
  }, [])

  return (
    <VerticalCard className={cx(className, 'min-w-[348px]')} imageSrc={coverImage?.data?.attributes?.url}>
      <UILink href={`/blog/${slug}`}>
        <div ref={cardRef} className="space-y-5">
          {tag?.data?.attributes?.title && <Tag title={tag?.data?.attributes?.title} color={tag?.data?.attributes?.pageCategory?.data?.attributes?.color} />}
          <h3 className="text-md font-semibold news-small-content">{title}</h3>
          <span className="text-xs font-medium">{moment(date_added || updatedAt).format('DD.MM.YYYY')}</span>
          <p className="text-sm news-small-content">{excerpt}</p>

          {slug && (
            <Button
              className="h-6 mt-5"
              shape="none"
              variant="muted"
              icon={isHover ? <ArrowRight color={tag?.data?.attributes?.pageCategory?.data?.attributes?.color} /> : <ChevronRight />}
            >
              <div
                className="relative font-semibold"
                style={{
                  color: isHover ? tag?.data?.attributes?.pageCategory?.data?.attributes?.color : 'black',
                }}
              >
                {readMoreText}
                <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 border-current border-b-2" />
              </div>
            </Button>
          )}
        </div>
      </UILink>
    </VerticalCard>
  )
}

export default NewsCard
