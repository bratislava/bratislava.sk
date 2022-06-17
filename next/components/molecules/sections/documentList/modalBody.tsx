import { VznEntity } from '@bratislava/strapi-sdk-homepage'
import { FileCard } from '@bratislava/ui-bratislava'
import { dateFormat } from '@utils/constants'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

export const DocumentListModalBody = ({ attributes }: VznEntity) => {
  return (
    <div className="bg-background max-w-3xl max-h-[75vh] overflow-y-auto modal-content-rent">
      <div className="py-8 px-12">
        <div className="text-md font-semibold"> {attributes?.title} </div>
        <div className="flex pt-3">
          {attributes?.mainDocument && (
            <div className="flex flex-col">
              <div> Platnosť od: </div>
              <div className="font-semibold"> {moment(attributes?.validFrom).format(dateFormat)} </div>
            </div>
          )}
          {!!attributes?.cancellationDocument?.length && (
            <div className="flex flex-col pl-5">
              <div> Platnosť do: </div>
              <div className="font-semibold">{moment(attributes?.cancellationDocument[0].validFrom).format(dateFormat)}</div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <ReactMarkdown children={attributes?.details} />
        </div>
        {/*  Main Document  */}
        {attributes?.mainDocument && (
          <div className="pt-5 max-w-xs">
            <div className="pb-4 font-semibold"> Hlavný dokument </div>
            <div>
              <FileCard
                downloadLink={attributes.mainDocument?.data?.attributes?.url}
                fileDetail={`${attributes.mainDocument?.data?.attributes?.ext?.toUpperCase()} ${attributes.mainDocument?.data?.attributes?.size} KB`}
                fileTitle={attributes?.title}
                uploadDate={moment(attributes.mainDocument?.data?.attributes?.createdAt).format(dateFormat)}
              />
            </div>
          </div>
        )}
        {attributes?.consolidatedText && (
          <div className="pt-5 max-w-xs">
            <div className="pb-4 font-semibold">Konsolidované znenie (zhrnutie)</div>
            <div>
              <FileCard
                downloadLink={attributes.consolidatedText?.data?.attributes?.url}
                fileDetail={`${attributes.consolidatedText?.data?.attributes?.ext?.toUpperCase()} ${attributes.consolidatedText?.data?.attributes?.size} KB`}
                fileTitle={attributes?.title}
                uploadDate={moment(attributes.consolidatedText?.data?.attributes?.createdAt).format(dateFormat)}
              />
            </div>
          </div>
        )}
        {!!attributes?.amedmentDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Dodatky </div>
            <div className="flex flex-wrap flex-row gap-5">
              {attributes.amedmentDocument.map((doc) => (
                <FileCard
                  key={doc.id}
                  className="w-80"
                  downloadLink={doc?.document?.data?.attributes?.url}
                  fileDetail={`${doc?.document?.data?.attributes?.ext?.toUpperCase()} ${doc?.document?.data?.attributes?.size} KB`}
                  fileTitle={doc?.title}
                  uploadDate={moment(doc?.document?.data?.attributes?.createdAt).format(dateFormat)}
                />
              ))}
            </div>
          </div>
        )}
        {!!attributes?.cancellationDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Zrušujúce VZN </div>
            <div className="flex flex-wrap flex-row gap-5">
              {attributes.cancellationDocument.map((doc) => (
                <FileCard
                  key={doc.id}
                  className="w-80"
                  downloadLink={doc?.document?.data?.attributes?.url}
                  fileDetail={`${doc?.document?.data?.attributes?.ext?.toUpperCase()} ${doc?.document?.data?.attributes?.size} KB`}
                  fileTitle={doc?.title}
                  uploadDate={moment(doc?.document?.data?.attributes?.createdAt).format(dateFormat)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
