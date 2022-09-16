/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FileCard } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import useSWR from 'swr'

// TODO fix dates
// TODO loading
export const LinkedVznMainDocument = ({ id, vznId, filePath }: { vznId: string; id: string; filePath: string }) => {
  const { data } = useSWR(['VznDetail', id], () => client.VznDetail({ id: vznId }))
  const getDocument = data?.vzn?.data?.attributes?.[filePath]?.find((doc) => doc.id === `${id}`)
  const title = getDocument?.title
  const file = getDocument?.document?.data?.attributes
  return file ? (
    <FileCard
      key={id}
      className="w-80"
      downloadLink={file?.url}
      fileDetail={`${file?.ext?.toUpperCase()} ${file?.size} KB`}
      fileTitle={title}
      uploadDate={new Date(file?.createdAt).toLocaleDateString()}
    />
  ) : null
}
