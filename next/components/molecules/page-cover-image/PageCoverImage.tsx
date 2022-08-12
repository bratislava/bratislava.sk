import { PageTitle } from '@bratislava/ui-bratislava'
import Image from 'next/image'
import * as React from 'react'
import { FC } from 'react'

interface Props {
  coverTitle?: string
  coverSubTitle?: string
  coverImageUrl: string
}
const PageCoverImage: FC<Props> = ({ coverTitle, coverSubTitle, coverImageUrl }) => (
  <div className="flex flex-col py-8 sm:flex-row sm:items-center lg:pt-18 lg:pb-10">
    {coverTitle && <PageTitle className="flex-1 pb-4" title={coverTitle} subtitle={coverSubTitle} />}
    {coverImageUrl && (
      <>
        {/* TODO: Change Image to img when Image handling changed */}
        <div className="hidden sm:block">
          <Image width={721} height={364} src={coverImageUrl} alt="Bratislava Hero" />
        </div>
        <div className="sm:hidden">
          <Image width={721} height={364} src={coverImageUrl} alt="Bratislava Hero" />
        </div>
      </>
    )}
  </div>
)

export default PageCoverImage
