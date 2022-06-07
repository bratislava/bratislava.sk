import { Vzn } from '@bratislava/strapi-sdk-homepage'
import { FileCard } from '@bratislava/ui-bratislava'
import { dateFormat } from '@utils/constants'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

type ModalBodyProps = {
  data: Vzn
}

export const DocumentListModalBody = ({ data }: ModalBodyProps) => {
  return (
    <div className="bg-background max-w-3xl max-h-[75vh] overflow-y-auto modal-content-rent">
      <div className="py-8 px-12">
        <div className="text-md font-semibold"> {data?.title} </div>
        <div className="flex pt-3">
          {data?.mainDocument && (
            <div className="flex flex-col">
              <div> Platnosť od: </div>
              <div className="font-semibold"> {moment(data?.validFrom).format(dateFormat)} </div>
            </div>
          )}
          {!!data?.cancellationDocument?.length && (
            <div className="flex flex-col pl-5">
              <div> Platnosť do: </div>
              <div className="font-semibold">{moment(data?.cancellationDocument[0].validFrom).format(dateFormat)}</div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <ReactMarkdown children={data?.details} />
        </div>
        {/*  Main Document  */}
        {data?.mainDocument && (
          <div className="pt-5 max-w-xs">
            <div className="pb-4 font-semibold"> Hlavný dokument </div>
            <div>
              <FileCard
                downloadLink={data.mainDocument?.url}
                fileDetail={`${data.mainDocument?.ext?.toUpperCase()} ${data.mainDocument?.size} KB`}
                fileTitle={data?.title}
                uploadDate={moment(data.mainDocument?.created_at).format(dateFormat)}
              />
            </div>
          </div>
        )}
        {data?.consolidatedText && (
          <div className="pt-5 max-w-xs">
            <div className="pb-4 font-semibold">Konsolidované znenie (zhrnutie)</div>
            <div>
              <FileCard
                downloadLink={data.consolidatedText?.url}
                fileDetail={`${data.consolidatedText?.ext?.toUpperCase()} ${data.consolidatedText?.size} KB`}
                fileTitle={data?.title}
                uploadDate={moment(data.consolidatedText?.created_at).format(dateFormat)}
              />
            </div>
          </div>
        )}
        {!!data?.amedmentDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Dodatky </div>
            <div className="flex flex-wrap flex-row gap-5">
              {data.amedmentDocument.map((doc) => (
                <FileCard
                  key={doc.id}
                  className="w-80"
                  downloadLink={doc?.document.url}
                  fileDetail={`${doc?.document.ext?.toUpperCase()} ${doc?.document.size} KB`}
                  fileTitle={doc?.title}
                  uploadDate={moment(doc?.document.created_at).format(dateFormat)}
                />
              ))}
            </div>
          </div>
        )}
        {!!data?.cancellationDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold"> Zrušujúce VZN </div>
            <div className="flex flex-wrap flex-row gap-5">
              {data.cancellationDocument.map((doc) => (
                <FileCard
                  key={doc.id}
                  className="w-80"
                  downloadLink={doc?.document.url}
                  fileDetail={`${doc?.document.ext?.toUpperCase()} ${doc?.document.size} KB`}
                  fileTitle={doc?.title}
                  uploadDate={moment(doc?.document.created_at).format(dateFormat)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
