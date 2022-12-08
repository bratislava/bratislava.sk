import { VznMeili } from '@backend/meili/types'
import { FileCard } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import { isPresent } from '@utils/utils'
import { useTranslation } from 'next-i18next'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'

const DocumentListModalBody = ({ vzn }: { vzn: VznMeili }) => {
  const vznId = vzn?.id
  const { data } = useSWR(['VznDetail', vznId], () => client.VznDetail({ id: vznId }))

  const { t } = useTranslation()
  return (
    <div className="modal-content-rent max-h-[75vh] max-w-3xl overflow-y-auto rounded-xl bg-gray-50">
      <div className="py-8 px-12">
        <div className="text-h4">{vzn?.title}</div>
        <div className="flex pt-3">
          {vzn?.mainDocument && (
            <div className="flex flex-col">
              <div>{t('vzn.validFrom')}:</div>
              <div className="font-semibold">{vzn?.validFrom}</div>
            </div>
          )}
          {!!vzn?.cancellationDocument?.length && (
            <div className="flex flex-col pl-5">
              <div>{t('vzn.validUntil')}:</div>
              <div className="font-semibold">{vzn?.cancellationDocument[0]?.validFrom}</div>
            </div>
          )}
        </div>
        {vzn?.details && (
          <div className="pt-5">
            <ReactMarkdown>{vzn?.details}</ReactMarkdown>
          </div>
        )}

        {/*  Main Document  */}
        {vzn?.mainDocument && (
          <div className="max-w-xs pt-5">
            <div className="pb-4 font-semibold">{t('vzn.mainDocument')}</div>
            <div>
              <FileCard
                downloadLink={vzn.mainDocument?.url}
                fileDetail={`${vzn.mainDocument?.ext?.toUpperCase()} ${vzn.mainDocument?.size} KB`}
                fileTitle={vzn?.title ?? vzn.mainDocument.name}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
                fileDetail={`${vzn.consolidatedText?.ext?.toUpperCase()} ${
                  vzn.consolidatedText?.size
                } KB`}
                fileTitle={vzn?.title ?? vzn.consolidatedText.name}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                uploadDate={new Date(vzn.consolidatedText?.createdAt).toLocaleDateString()}
              />
            </div>
          </div>
        )}
        {!!vzn?.amedmentDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold">{t('vzn.amendments')}</div>
            <div className="flex flex-row flex-wrap gap-5">
              {vzn.amedmentDocument.map((amedmentDocument) => {
                const getDocument = data?.vzn?.data?.attributes?.amedmentDocument
                  ?.filter(isPresent)
                  .find((doc) => doc.id === `${amedmentDocument?.id}`)
                const title = getDocument?.title
                const file = getDocument?.document?.data?.attributes
                return file ? (
                  <FileCard
                    key={amedmentDocument?.id}
                    className="w-80"
                    downloadLink={file?.url}
                    fileDetail={`${file?.ext?.toUpperCase()} ${file?.size} KB`}
                    fileTitle={title ?? undefined}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    uploadDate={new Date(file?.createdAt).toLocaleDateString()}
                  />
                ) : null
              })}
            </div>
          </div>
        )}
        {!!vzn?.cancellationDocument?.length && (
          <div className="pt-5">
            <div className="pb-4 font-semibold">{t('vzn.cancellationDocument')}</div>
            <div className="flex flex-row flex-wrap gap-5">
              {vzn.cancellationDocument.map((cancellationDocument) => {
                const getDocument = data?.vzn?.data?.attributes?.cancellationDocument
                  ?.filter(isPresent)
                  .find((doc) => doc.id === `${cancellationDocument?.id}`)
                const title = getDocument?.title
                const file = getDocument?.document?.data?.attributes
                return file ? (
                  <FileCard
                    key={cancellationDocument?.id}
                    className="w-80"
                    downloadLink={file?.url}
                    fileDetail={`${file?.ext?.toUpperCase()} ${file?.size} KB`}
                    fileTitle={title ?? undefined}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    uploadDate={new Date(file?.createdAt).toLocaleDateString()}
                  />
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentListModalBody
