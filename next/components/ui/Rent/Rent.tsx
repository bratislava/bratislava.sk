// @ts-strict-ignore
import cx from 'classnames'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { ArrowRight, ChevronRight } from '../../../assets/images'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

export interface RentProps {
  className?: string
  icon?: {
    data?: {
      attributes?: {
        url?: string
      }
    }
  }
  title?: string | null | undefined
  desc?: string | null | undefined
  linkLabel?: string
}

export const Rent = ({ className, icon, title, desc, linkLabel }: RentProps) => {
  const isMore = desc?.length > 100
  const [isOpen, setOpen] = useState(false)
  return (
    <div
      className={cx(
        className,
        'flex flex-col text-center flex-1 items-center px-3 md:bg-transparent rent-shadow rounded-xl p-5 max-h-sm min-w-[240px] mr-4 md:mr-0 lg:min-w-0'
      )}
    >
      <div
        className="rounded-full"
        style={{
          backgroundColor: 'var(--secondary-color)',
        }}
      >
        {icon?.data?.attributes?.url && <img className="h-30 w-30 p-5" src={icon.data.attributes.url} alt={title} />}
      </div>
      <div className="flex w-60 flex-col items-center text-center md:w-auto xl:w-73 ">
        <h1 className="text-h4 mt-5 mb-7 h-16 font-normal">{title}</h1>

        <div className="news-small-content w-full break-all text-center">
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
        <div
          className="modal-content-rent max-h-[412px] overflow-y-auto rounded-2xl py-7 px-6 md:max-h-[600px] md:py-10 md:px-12"
          style={{
            maxWidth: '650px',
            // maxHeight: '600px',
            backgroundColor: 'var(--secondary-color)',
          }}
        >
          <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-white md:mx-0 md:h-40 md:w-40">
            {icon?.data?.attributes?.url && (
              <img className="p-5" src={icon.data.attributes.url} alt={title} width="160" height="160" />
            )}
          </div>
          <h1 className="text-h4 mb-8 text-left font-normal">{title}</h1>
          <ReactMarkdown remarkPlugins={[[remarkGfm]]} skipHtml className="modal-content-rent-markdown text-left">
            {desc}
          </ReactMarkdown>
        </div>
      </Modal>
    </div>
  )
}

export default Rent
