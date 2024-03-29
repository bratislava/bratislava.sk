import { client } from '@backend/graphql/gql'
import { VznMeili } from '@backend/meili/types'
import Markdown from '@components/atoms/Markdown'
import FileCard from '@components/molecules/presentation/FileCard'
import { formatFileSize } from '@utils/formatFileSize'
import { formatDate } from '@utils/local-date'
import { isPresent } from '@utils/utils'
import { useLocale, useTranslations } from 'next-intl'
import useSWR from 'swr'

const RegulationModalBody = ({ vzn }: { vzn: VznMeili }) => {
  const vznId = vzn?.id
  const { data } = useSWR(['VznDetail', vznId], () => client.VznDetail({ id: vznId }))

  const t = useTranslations()
  const locale = useLocale()

  const gridClassNames = 'grid grid-cols-1 md:grid-cols-2 gap-4'

  return (
    <>
      <div className="flex">
        {vzn?.mainDocument && (
          <div className="flex flex-col">
            <div>{t('vzn.validFrom')}:</div>
            <div className="font-semibold">{formatDate(vzn?.validFrom)}</div>
          </div>
        )}
        {!!vzn?.cancellationDocument?.length && (
          <div className="flex flex-col pl-5">
            <div>{t('vzn.validUntil')}:</div>
            <div className="font-semibold">
              {formatDate(vzn?.cancellationDocument[0]?.validFrom)}
            </div>
          </div>
        )}
      </div>
      {vzn?.details && (
        <div className="pt-5">
          <Markdown content={vzn?.details} />
        </div>
      )}

      {/*  Main Document  */}
      {vzn?.mainDocument && (
        <div className="pt-5">
          <div className="pb-4 font-semibold">{t('vzn.mainDocument')}</div>
          <div className={gridClassNames}>
            <FileCard
              title={vzn?.title ?? vzn.mainDocument.name}
              downloadLink={vzn.mainDocument?.url}
              format={vzn.mainDocument?.ext?.toUpperCase()}
              size={formatFileSize(vzn.mainDocument?.size, locale)}
              uploadDate={formatDate(vzn.mainDocument?.createdAt)}
            />
          </div>
        </div>
      )}
      {vzn?.consolidatedText && (
        <div className="pt-5">
          <div className="pb-4 font-semibold">{t('vzn.consolidatedText')}</div>
          <div className={gridClassNames}>
            <FileCard
              downloadLink={vzn.consolidatedText?.url}
              size={formatFileSize(vzn.consolidatedText?.size, locale)}
              format={vzn.consolidatedText?.ext ?? undefined}
              title={vzn?.title ?? vzn.consolidatedText.name}
              uploadDate={formatDate(vzn.consolidatedText?.createdAt)}
            />
          </div>
        </div>
      )}
      {!!vzn?.amedmentDocument?.length && (
        <div className="pt-5">
          <div className="pb-4 font-semibold">{t('vzn.amendments')}</div>
          <div className={gridClassNames}>
            {vzn.amedmentDocument.map((amedmentDocument) => {
              const getDocument = data?.vzn?.data?.attributes?.amedmentDocument
                ?.filter(isPresent)
                .find((doc) => doc.id === `${amedmentDocument?.id}`)
              const title = getDocument?.title
              const file = getDocument?.document?.data?.attributes
              return file ? (
                <FileCard
                  key={amedmentDocument?.id}
                  downloadLink={file?.url}
                  size={formatFileSize(file?.size, locale)}
                  format={file?.ext?.toUpperCase()}
                  title={title ?? ''}
                  uploadDate={formatDate(file?.createdAt)}
                />
              ) : null
            })}
          </div>
        </div>
      )}
      {!!vzn?.cancellationDocument?.length && (
        <div className="pt-5">
          <div className="pb-4 font-semibold">{t('vzn.cancellationDocument')}</div>
          <div className={gridClassNames}>
            {vzn.cancellationDocument.map((cancellationDocument) => {
              const getDocument = data?.vzn?.data?.attributes?.cancellationDocument
                ?.filter(isPresent)
                .find((doc) => doc.id === `${cancellationDocument?.id}`)
              const title = getDocument?.title
              const file = getDocument?.document?.data?.attributes
              return file ? (
                <FileCard
                  key={cancellationDocument?.id}
                  downloadLink={file?.url}
                  size={formatFileSize(file?.size, locale)}
                  format={file?.ext?.toUpperCase()}
                  title={title ?? ''}
                  uploadDate={formatDate(file?.createdAt)}
                />
              ) : null
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default RegulationModalBody
