import { FileCard } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'

import { LinkedVznMainDocument } from './LinkedVznMainDocument'

// we're taking the entity from meilisearch which unfortunately types differently
// TODO fix dates
export const DocumentListModalBody = (vzn: any) => {
  return (
    <div className="modal-content-rent max-h-[75vh] max-w-3xl overflow-y-auto bg-background">
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
          <div className="max-w-xs pt-5">
            <div className="pb-4 font-semibold"> Hlavný dokument </div>
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
            <div className="pb-4 font-semibold">Konsolidované znenie (zhrnutie)</div>
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
            <div className="pb-4 font-semibold"> Dodatky </div>
            <div className="flex flex-row flex-wrap gap-5">
              {vzn.amedmentDocument.map((doc) => (doc?.id ? <LinkedVznMainDocument key={doc.id} id={doc.id} /> : null))}
            </div>
          </div>
        )}
        {!!vzn?.cancellationDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Zrušujúce VZN </div>
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
