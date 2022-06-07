import cx from 'classnames'
import React from 'react'
import Button from '../Button/Button'
import Divider from '../Divider/Divider'
import { DownloadCard } from '../DownloadCard/DownloadCard'
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

export type TFile = {
  title?: string
  category?: string
  media?: {
    url: string
    created_at: string
    size: number
    ext?: string
  }
}

export type TFileSection = {
  category: string
  files: TFile[]
}

export interface FileListProps {
  className?: string
  fileSections?: TFileSection[]
  dividerStyle?: string
  hideCategory?: boolean
}

export const FileList = ({ className, fileSections, dividerStyle, hideCategory }: FileListProps) => {
  const [clicked, setClicked] = React.useState(false)
  const [buttonText, setButtonText] = React.useState('Načítať ďalšie')
  const numberOfItemsPerRow = 9
  const maxRemainder = 3

  const handleClick = () => {
    if (clicked) {
      setButtonText('Načítať ďalšie')
    } else {
      setButtonText('Zobraziť menej')
    }
    setClicked(!clicked)
  }
  return (
    <div className={className}>
      {fileSections?.map((fileSection, index) => {
        const length = fileSection.files.length
        const rem = length % numberOfItemsPerRow
        const quo = (length - rem) / numberOfItemsPerRow
        const rows = !clicked ? 1 : rem > maxRemainder ? quo + 1 : quo
        return (
          <div key={index} className={cx({ 'mt-5': index > 0 })}>
            <div className="hidden lg:flex flex-col space-y-8" key={fileSection.category ?? ''}>
              {Array.from(Array(rows).keys()).map((row) => {
                const start = row * numberOfItemsPerRow
                const end = !clicked ? 6 : (row + 1) * numberOfItemsPerRow
                return (
                  <div className="space-y-6" key={row}>
                    {row == 0 && fileSection.category && !hideCategory && (
                      <span className="text-default md:text-md font-medium">{fileSection.category}</span>
                    )}

                    <div className={cx('grid grid-cols-1 w-full gap-y-6', 'md:grid-cols-3 md:gap-x-7 md:gap-y-8')}>
                      {fileSection?.files.slice(start, end).map((file, index) => (
                        <div key={index} className="w-full">
                          <DownloadCard
                            title={file.title ? file.title : ''}
                            downloadLink={file.media?.url ? file.media?.url : ''}
                            uploadDate={file.media?.created_at ? file.media?.created_at : ''}
                            downloadDetail={
                              file.media?.ext && file.media.size
                                ? `${file.media?.ext?.toUpperCase()}; ${file.media?.size.toString()} kB`
                                : ''
                            }
                          />
                        </div>
                      ))}
                    </div>
                    {row != rows - 1 && dividerStyle && <Divider className="pt-18 pb-6" dividerStyle={dividerStyle} />}
                  </div>
                )
              })}
              {length > 6 && (
                <Button className="self-center text-default px-6 py-2.5" variant="transparent" onClick={handleClick}>
                  {buttonText}
                </Button>
              )}
            </div>
            <div className="flex lg:hidden">
              <HorizontalScrollWrapper className="gap-x-5">
                {fileSection?.files.map((file, index) => (
                  <div key={index}>
                    <DownloadCard
                      className="min-w-[280px]"
                      title={file.title ? file.title : ''}
                      downloadLink={file.media?.url ? file.media?.url : ''}
                      uploadDate={file.media?.created_at ? file.media?.created_at : ''}
                      downloadDetail={
                        file.media?.ext && file.media.size
                          ? `${file.media?.ext?.toUpperCase()}; ${file.media?.size.toString()} kB`
                          : ''
                      }
                    />
                  </div>
                ))}
              </HorizontalScrollWrapper>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FileList
