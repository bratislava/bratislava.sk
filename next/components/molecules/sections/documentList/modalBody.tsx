import { VznEntity } from '@bratislava/strapi-sdk-homepage'
import { FileCard } from '@bratislava/ui-bratislava'
import { dateFormat } from '@utils/constants'
import { getNumericLocalDate } from '@utils/local-date'
import ReactMarkdown from 'react-markdown'

// TODO fix typing - we're taking the entity from meilisearch which unfortunately types differently
// TODO fix dates
export const DocumentListModalBody = (vzn: any) => {
  return (
    <div className="bg-background max-w-3xl max-h-[75vh] overflow-y-auto modal-content-rent">
      <div className="py-8 px-12">
        <div className="text-md font-semibold"> {vzn?.title} </div>
        <div className="flex pt-3">
          {vzn?.mainDocument && (
            <div className="flex flex-col">
              <div> Platnosť od: </div>
              <div className="font-semibold"> {vzn?.validFrom} </div>
            </div>
          )}
          {!!vzn?.cancellationDocument?.length && (
            <div className="flex flex-col pl-5">
              <div> Platnosť do: </div>
              <div className="font-semibold">{vzn?.cancellationDocument[0].validFrom}</div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <ReactMarkdown children={vzn?.details} />
        </div>
        {/*  Main Document  */}
        {vzn?.mainDocument && (
          <div className="pt-5 max-w-xs">
            <div className="pb-4 font-semibold"> Hlavný dokument </div>
            <div>
              <FileCard
                downloadLink={vzn.mainDocument?.data?.url}
                fileDetail={`${vzn.mainDocument?.data?.ext?.toUpperCase()} ${vzn.mainDocument?.data?.size} KB`}
                fileTitle={vzn?.title}
                uploadDate={vzn.mainDocument?.data?.createdAt}
              />
            </div>
          </div>
        )}
        {vzn?.consolidatedText && (
          <div className="pt-5 max-w-xs">
            <div className="pb-4 font-semibold">Konsolidované znenie (zhrnutie)</div>
            <div>
              <FileCard
                downloadLink={vzn.consolidatedText?.data?.url}
                fileDetail={`${vzn.consolidatedText?.data?.ext?.toUpperCase()} ${vzn.consolidatedText?.data?.size} KB`}
                fileTitle={vzn?.title}
                uploadDate={vzn.consolidatedText?.data?.createdAt}
              />
            </div>
          </div>
        )}
        {!!vzn?.amedmentDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Dodatky </div>
            <div className="flex flex-wrap flex-row gap-5">
              {vzn.amedmentDocument.map((doc) => (
                <FileCard
                  key={doc.id}
                  className="w-80"
                  downloadLink={doc?.document?.data?.url}
                  fileDetail={`${doc?.document?.data?.ext?.toUpperCase()} ${doc?.document?.data?.size} KB`}
                  fileTitle={doc?.title}
                  uploadDate={doc?.document?.data?.createdAt}
                />
              ))}
            </div>
          </div>
        )}
        {!!vzn?.cancellationDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Zrušujúce VZN </div>
            <div className="flex flex-wrap flex-row gap-5">
              {vzn.cancellationDocument.map((doc) => (
                <FileCard
                  key={doc.id}
                  className="w-80"
                  downloadLink={doc?.document?.data?.url}
                  fileDetail={`${doc?.document?.data?.ext?.toUpperCase()} ${doc?.document?.data?.size} KB`}
                  fileTitle={doc?.title}
                  uploadDate={doc?.document?.data?.createdAt}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
