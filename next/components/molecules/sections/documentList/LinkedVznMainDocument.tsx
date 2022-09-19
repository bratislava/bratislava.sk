/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FileCard } from '@bratislava/ui-bratislava'
import { client } from '@utils/gql'
import useSWR from 'swr'

// TODO fix dates
// TODO loading
export const LinkedVznMainDocument = ({ id }: { id: string }) => {
  const { data } = useSWR(['VznDetail', id], () => client.VznDetail({ id }))
  const title = data?.vzn?.data?.attributes?.title
  const file = data?.vzn?.data?.attributes?.mainDocument?.data?.attributes
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
