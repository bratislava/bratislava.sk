import cx from 'classnames'
import { ChevronRight, ArrowRight } from '../../../assets/images'
import { Button } from '../Button/Button'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface RentProps {
  className?: string
  icon?: {
    data?: {
      attributes?: {
        url?: string
      }
    }
  }
  title?: string
  desc?: string
  linkLabel?: string
}

export const Rent = ({ className, icon, title, desc, linkLabel }: RentProps) => {
  const isMore = desc.length > 100
  const [isOpen, setOpen] = useState(false)
  return (
    <div
      className={cx(
        className,
        'flex flex-col text-center items-center px-2 flex-1 md:bg-transparent bg-white rent-shadow rounded-xl p-5 max-h-sm max-w-xs'
      )}
    >
      <div
        className="rounded-full"
        style={{
          backgroundColor: 'var(--secondary-color)',
        }}
      >
        {icon?.data?.attributes?.url && (
          <img className="p-5 md:w-30 md:h-30 w-28 h-28" src={icon.data.attributes.url} alt={title} />
        )}
      </div>
      <div className="flex flex-col text-center items-center w-60 md:w-auto xl:w-73 ">
        <h1 className="text-md mt-5 mb-7 h-16">{title}</h1>
        <div className="news-small-content w-full break-all text-center">
          <ReactMarkdown skipHtml={true} children={desc} />
        </div>
        {isMore && (
          <Button
            className="h-6 mt-5 z-0 font-semibold text-sm leading-6 md:leading-8 md:text-default"
            shape="none"
            variant="muted"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight/>}
            onClick={() => setOpen(true)}
          >
            <div className="relative">
              {linkLabel}
              <div className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 border-current border-b-2" />
            </div>
          </Button>
        )}
      </div>
      <Modal closeButtonColor="#E46054" isOpen={isOpen} onClose={() => setOpen(false)}>
        <div
          className="modal-content-rent rounded-2xl py-7 px-6 md:py-10 md:px-12 overflow-y-auto"
          style={{
            maxWidth: '650px',
            maxHeight: '600px',
            backgroundColor: 'var(--secondary-color)',
          }}
        >
          <div className="rounded-full bg-white w-max mx-auto md:mx-0 mb-8 h-24 w-24 md:h-40 md:w-40">
            {icon?.data?.attributes?.url && (
              <img className="p-5" src={icon.data.attributes.url} alt={title} width="160" height="160" />
            )}
          </div>
          <h1 className="text-md mb-8 text-left">{title}</h1>
          <ReactMarkdown
            remarkPlugins={[[remarkGfm]]}
            skipHtml={true}
            children={desc}
            className="text-left modal-content-rent-markdown"
          />
        </div>
      </Modal>
    </div>
  )
}

export default Rent
