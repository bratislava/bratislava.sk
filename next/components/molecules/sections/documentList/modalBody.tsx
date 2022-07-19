import { FileCard } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'

import { LinkedVznMainDocument } from './LinkedVznMainDocument'

// we're taking the entity from meilisearch which unfortunately types differently
// TODO fix typing
export const DocumentListModalBody = (vzn: any) => {
  const { t } = useTranslation()
  return (
    <div className="modal-content-rent max-h-[75vh] max-w-3xl overflow-y-auto bg-background">
      <div className="py-8 px-12">
        <div className="text-md font-semibold"> {vzn?.title} </div>
        <div className="flex pt-3">
          {vzn?.mainDocument && (
            <div className="flex flex-col">
              <div> {t('vzn.validFrom')}: </div>
              <div className="font-semibold"> {vzn?.validFrom} </div>
            </div>
          )}
          {!!vzn?.cancellationDocument?.length && (
            <div className="flex flex-col pl-5">
              <div> {t('vzn.validUntil')}: </div>
              <div className="font-semibold">{vzn?.cancellationDocument[0].validFrom}</div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <ReactMarkdown children={vzn?.details} />
        </div>
        {/*  Main Document  */}
        {vzn?.mainDocument && (
          <div className="max-w-xs pt-5">
            <div className="pb-4 font-semibold"> {t('vzn.mainDocument')} </div>
            <div>
              <FileCard
                downloadLink={vzn.mainDocument?.url}
                fileDetail={`${vzn.mainDocument?.ext?.toUpperCase()} ${vzn.mainDocument?.size} KB`}
                fileTitle={vzn?.title}
                uploadDate={new Date(vzn.mainDocument?.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        )}
        {vzn?.consolidatedText && (
          <div className="max-w-xs pt-5">
            <div className="pb-4 font-semibold">{t('vzn.consolidatedText')}</div>
            <div>
              <FileCard
                downloadLink={vzn.consolidatedText?.url}
                fileDetail={`${vzn.consolidatedText?.ext?.toUpperCase()} ${vzn.consolidatedText?.size} KB`}
                fileTitle={vzn?.title}
                uploadDate={new Date(vzn.consolidatedText?.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        )}
        {!!vzn?.amedmentDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> {t('vzn.amendments')} </div>
            <div className="flex flex-row flex-wrap gap-5">
              {vzn.amedmentDocument.map((doc) => (doc?.id ? <LinkedVznMainDocument key={doc.id} id={doc.id} /> : null))}
            </div>
          </div>
        )}
        {!!vzn?.cancellationDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> {t('vzn.cancellationDocument')} </div>
            <div className="flex flex-row flex-wrap gap-5">
              {vzn.cancellationDocument.map((doc) =>
                doc?.id ? <LinkedVznMainDocument key={doc.id} id={doc.id} /> : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
