import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { BlogSearchCard } from '../BlogSearchCard/BlogSearchCard'
import Button from '../Button/Button'
import { BlogItem } from '../FeaturedBlogs/FeaturedBlogs'
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface BlogSearchCardsProps {
  title: string
  blogs?: BlogItem[]
  handleButtonClick?: (isOpen: boolean) => void
}

export const BlogSearchCards = ({ title, blogs, handleButtonClick }: BlogSearchCardsProps) => {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const [buttonText, setButtonText] = useState(`${t('loadMore')}`)
  const handleClick = () => {
    if (isOpen) {
      setButtonText(t('loadMore'))
    } else {
      setButtonText(t('showLess'))
    }
    handleButtonClick(!isOpen)
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="text-default lg:text-md font-semibold">{title}</div>
      <div className="hidden lg:flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-6">
          {blogs.map((blog, index) => {
            return <BlogSearchCard key={index} item={blog} className="h-48" imageClassName="w-56 h-48" />
          })}
        </div>
        <Button variant="transparent" className="w-fit px-6 py-2.5 text-default self-center" onClick={handleClick}>
          {buttonText}
        </Button>
      </div>
      <HorizontalScrollWrapper className="lg:hidden gap-x-4">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} item={blog} className="w-74 h-60 flex-shrink-0" />
        })}
      </HorizontalScrollWrapper>
    </div>
  )
}
