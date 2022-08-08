import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { getNumericLocalDate } from '@utils/local-date'
import cx from 'classnames'
import { RefObject, useEffect, useRef, useState } from 'react'

import { ArrowRight, ChevronRight } from '../../../assets/images'
import { Button } from '../Button/Button'
import { Tag } from '../Tag/Tag'
import { VerticalCard } from '../VerticalCard/VerticalCard'

export interface NewsCardProps {
  id?: string
  className?: string
  readMoreText?: string
  coverImage?: {
    data?: {
      attributes?: {
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
  publishedAt?: string | null
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
  publishedAt,
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
    <VerticalCard
      className={cx(className, 'min-w-[280px] leading-extra-tight')}
      imageSrc={coverImage?.data?.attributes?.url}
    >
      <UILink href={`/blog/${slug}`}>
        <div ref={cardRef} className="space-y-5">
          {tag?.data?.attributes?.title && (
            <Tag
              title={tag?.data?.attributes?.title}
              color={tag?.data?.attributes?.pageCategory?.data?.attributes?.color}
            />
          )}
          <h3 className="news-small-content text-default font-semibold lg:text-md">{title}</h3>
          {/* TODO this will rarely matter (only once we start showing previews of unpublished posts to admins), but below we should prefer createdAt before updatedAt */}
          <span className="text-xs font-medium">{getNumericLocalDate(date_added || publishedAt || updatedAt)}</span>
          <p className="news-small-content text-sm">{excerpt}</p>
          <div>
            {slug && (
              <Button
                className="mt-5 h-6"
                shape="none"
                variant="muted"
                onMouseEnter={enterListner}
                onMouseLeave={exitListner}
                icon={
                  isHover ? (
                    <ArrowRight color={tag?.data?.attributes?.pageCategory?.data?.attributes?.color} />
                  ) : (
                    <ChevronRight color="black" />
                  )
                }
              >
                <div
                  className="relative font-semibold"
                  style={{
                    color: isHover ? tag?.data?.attributes?.pageCategory?.data?.attributes?.color : 'black',
                  }}
                >
                  {readMoreText}
                  <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 border-b-2 border-current" />
                </div>
              </Button>
            )}
          </div>
        </div>
      </UILink>
    </VerticalCard>
  )
}

export default NewsCard
