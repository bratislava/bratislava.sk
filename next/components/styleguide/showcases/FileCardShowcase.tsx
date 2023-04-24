import { UploadFileEntityFragment } from '@bratislava/strapi-sdk-homepage'
import FileCard from '@components/molecules/presentation/FileCard'
import { Wrapper } from '@components/styleguide/Wrapper'
import React from 'react'

const FileCardShowcase = () => {
  const cards = [
    {
      fileEntity: {
        id: '1',
        attributes: {
          name: 'File 1',
          url: '#',
          size: 100,
          ext: '.pdf',
          updatedAt: '2021-09-01',
        },
      } as UploadFileEntityFragment,
    },
    {
      fileEntity: {
        id: '1',
        attributes: {
          name: 'File 2 with very very very very very very very very very very very very very very very long title',
          url: '#',
          size: 100,
          ext: '.docx',
        },
      } as UploadFileEntityFragment,
    },
    {
      fileEntity: {
        id: '1',
        attributes: {
          name: 'File 3',
          url: '#',
          size: 29_394,
          ext: '.jpg',
        },
      } as UploadFileEntityFragment,
    },
  ]

  return (
    <Wrapper title="Category Card">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ fileEntity }) => (
          <FileCard fileEntity={fileEntity} variant="border" />
        ))}
      </div>
    </Wrapper>
  )
}

export default FileCardShowcase
