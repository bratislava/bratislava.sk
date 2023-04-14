// @ts-strict-ignore
import { ArrowRight, ChevronRight } from '@assets/images'
import cx from 'classnames'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

export interface RentProps {
  className?: string
  icon?: {
    data?: {
      attributes?: {
        url?: string
      } | null
    } | null
  } | null
  title?: string | null | undefined
  desc?: string | null | undefined
  linkLabel?: string | null
}

export const Rent = ({ className, icon, title, desc, linkLabel }: RentProps) => {
  const isMore = desc?.length > 100
  const [isOpen, setOpen] = useState(false)
  return (
    <div
      className={cx(
        className,
        'rent-shadow max-h-sm min-w-60 mr-4 flex flex-1 flex-col items-center rounded-xl p-5 px-3 text-center md:mr-0 md:bg-transparent lg:min-w-0',
      )}
    >
      <div className="rounded-full bg-category-200">
        {icon?.data?.attributes?.url && (
          <img className="h-32 w-32 p-5" src={icon.data.attributes.url} alt={title} />
        )}
      </div>
      <div className="flex w-60 flex-col items-center text-center md:w-auto xl:w-[294px]">
        <h1 className="text-h4 mb-7 mt-5 h-16">{title}</h1>

        <div className="w-full break-words text-center">
          {/* TODO replace by Markdown component - not used now, because it breaks modal for some reason */}
          <ReactMarkdown skipHtml>{desc}</ReactMarkdown>
        </div>
        {isMore && (
          <Button
            className="text-h5 z-0 mt-5 h-6 leading-6 md:leading-8"
            shape="none"
            variant="muted"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
            onClick={() => setOpen(true)}
          >
            <div className="relative">
              {linkLabel}
              <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 border-b-2 border-current" />
            </div>
          </Button>
        )}
      </div>
      <Modal closeButtonColor="#E46054" isOpen={isOpen} onClose={() => setOpen(false)}>
        <div className="modal-content-rent max-h-104 max-w-[660px] overflow-y-auto rounded-2xl bg-category-200 px-6 py-7 md:max-h-[610px] md:px-12 md:py-10">
          <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-white md:mx-0 md:h-40 md:w-40">
            {icon?.data?.attributes?.url && (
              <img
                className="p-5"
                src={icon.data.attributes.url}
                alt={title}
                width="160"
                height="160"
              />
            )}
          </div>
          <h1 className="text-h4 mb-8 text-left">{title}</h1>
          {/* TODO replace by Markdown component with proper styles, remove modal-content-rent-markdown class */}
          <ReactMarkdown
            remarkPlugins={[[remarkGfm]]}
            skipHtml
            className="modal-content-rent-markdown text-left"
          >
            {desc}
          </ReactMarkdown>
        </div>
      </Modal>
    </div>
  )
}

export default Rent
