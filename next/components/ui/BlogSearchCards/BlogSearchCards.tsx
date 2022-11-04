// @ts-strict-ignore
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { BlogPostMeili } from '../../../utils/meiliTypes'
import { BlogSearchCard } from '../BlogSearchCard/BlogSearchCard'
import { Button } from '../Button/Button'
import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface BlogSearchCardsProps {
  title: string
  blogs?: BlogPostMeili[]
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
      <div className="text-h4">{title}</div>
      <div className="hidden flex-col gap-y-6 lg:flex">
        <div className="flex flex-col gap-y-6">
          {blogs.map((blog, index) => {
            return <BlogSearchCard key={index} item={blog} className="h-50" imageClassName="w-56 h-50" />
          })}
        </div>
        <Button variant="transparent" className="text-default w-fit self-center px-6 py-2.5" onClick={handleClick}>
          {buttonText}
        </Button>
      </div>
      <HorizontalScrollWrapper className="gap-x-4 lg:hidden">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} item={blog} className="w-74 h-60 shrink-0" />
        })}
      </HorizontalScrollWrapper>
    </div>
  )
}
