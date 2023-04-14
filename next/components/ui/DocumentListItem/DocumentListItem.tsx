import { ArrowRight, ChevronRight, Download } from '@assets/images'
import { useTranslation } from 'next-i18next'

import Button from '../Button/Button'

interface DocumentListItemProps {
  categoryName: string
  title: string
  Icon: string
  onClick: Function
  mainDocumentHref?: string
  id: string
  moreDocuments: string[]
}

export const DocumentListItem = ({
  categoryName,
  title,
  Icon,
  onClick,
  id,
  moreDocuments,
  mainDocumentHref,
}: DocumentListItemProps) => {
  const { t } = useTranslation()

  return (
    <div className="min-w-66 mb-1 flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        <div className="flex p-4 pb-0 md:justify-center lg:px-12 lg:py-10">
          <Icon />
        </div>
        <div className="flex flex-[4] flex-col justify-start px-4 py-3 lg:px-8 lg:py-10 lg:pl-0">
          <div className="text-p3 lg:text-p2">{categoryName}</div>
          <div className="text-p2 lg:text-p1 line-clamp-2 font-semibold">{title}</div>
          {moreDocuments.length > 0 ? (
            <div className="text-p1 lg:text-p2 pt-4">
              {t('documents')}:{' '}
              {moreDocuments.map((documentTitle, index) => (
                <span>
                  {documentTitle}
                  {index === moreDocuments.length - 1 ? '' : ', '}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between bg-zinc-50 py-4 pl-5 md:grow-0 md:basis-[300px] md:justify-evenly md:px-2 md:py-11">
        <div>
          <Button
            className="text-p2 lg:text-p1 font-semibold text-font underline"
            shape="none"
            variant="muted"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
            onClick={() => onClick(id)}
          >
            {t('show')}
          </Button>
        </div>

        {mainDocumentHref && (
          <div className="pr-6 text-category-600 md:pr-0 lg:text-font">
            <a href={mainDocumentHref} download>
              <Download />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
