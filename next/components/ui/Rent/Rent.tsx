import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { RentFieldsFragment } from '@bratislava/strapi-sdk-homepage'
import cx from 'classnames'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { ArrowRight, ChevronRight } from '../../../assets/images'
import { Button } from '../Button/Button'
import Modal from '../Modal/Modal'

export interface RentProps {
  className?: string
  icon?: {
    data?: {
      attributes?: {
        url?: string
      }
    }
  }
  subText?: string
  url?: string
  anchor?: string
  subTitle?: string | null | undefined
  modalContent?: string | null | undefined
  linkLabel?: string
  buttonTitle?: string
  page?: RentFieldsFragment['page']
}

export const Rent = ({ className, icon, subTitle, modalContent, subText, url, linkLabel, page, buttonTitle, anchor }: RentProps) => {
  const pageLink = page?.data?.attributes
  const [isOpen, setOpen] = useState(false)
  const { Link } = useUIContext();

  const buttonClick = () => {
    if(url || pageLink) return;
    setOpen(true);
  }

  const getLable = () => buttonTitle || linkLabel

  const LinkContent = () => (<Link href={url} target="_blank" rel="noopener noreferrer" > {getLable()} </Link>);

  const PageContent = () => (<Link href={`${pageLink.locale}/${pageLink.slug}${anchor ? `#${anchor}` : '' }`}> {getLable()} </Link>);

  let linkData;
  if(url){
    linkData = LinkContent
  } else if(pageLink) {
    linkData = PageContent
  } else {
    linkData = getLable
  }

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
          <img className="h-28 w-28 p-5 md:h-30 md:w-30" src={icon.data.attributes.url} alt={subTitle} />
        )}
      </div>
      <div className="flex w-60 flex-col items-center text-center md:w-auto xl:w-73 ">
        <h1 className="mt-4 mb-5 h-16 text-md">{subTitle}</h1>
        <div className="news-small-content w-full break-all text-center">
          <ReactMarkdown skipHtml children={subText} />
        </div>
        {(modalContent || url || pageLink) && (
          <Button
            className="z-0 mt-5 h-6 text-sm font-semibold leading-6 md:text-default md:leading-8"
            shape="none"
            variant="muted"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
            onClick={buttonClick}
          >
            <div className="relative">
              {linkData()}
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
          <div className="mx-auto mb-8 h-24 w-max w-24 rounded-full bg-white md:mx-0 md:h-40 md:w-40">
            {icon?.data?.attributes?.url && (
              <img className="p-5" src={icon.data.attributes.url} alt={subTitle} width="160" height="160" />
            )}
          </div>
          <h1 className="mb-8 text-left text-md">{subTitle}</h1>
          <ReactMarkdown
            remarkPlugins={[[remarkGfm]]}
            skipHtml
            children={modalContent}
            className="modal-content-rent-markdown text-left"
          />
        </div>
      </Modal>
    </div>
  )
}

export default Rent