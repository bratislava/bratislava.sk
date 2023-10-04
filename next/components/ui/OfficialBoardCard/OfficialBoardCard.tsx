// @ts-strict-ignore
import Dialog from '@components/ui/ModalDialog/Dialog'
import Modal from '@components/ui/ModalDialog/Modal'
import OfficialBoardCardModalContent from '@components/ui/OfficialBoardCard/OfficialBoardCardModalContent'
import { formatDate } from '@utils/local-date'
import React from 'react'
import { Button as AriaButton, DialogTrigger } from 'react-aria-components'

import { Panel } from '../Panel/Panel'

export interface OfficialBoardCardProps {
  title: string
  id: string
  createdAt: string
  content: string
  className?: string
  viewButtonText: string
  downloadButtonText: string
}

export const OfficialBoardCard = ({
  title,
  createdAt,
  id,
  content,
  className,
  viewButtonText,
}: OfficialBoardCardProps) => {
  return (
    <Panel className={className}>
      <div className="flex w-full flex-col gap-y-5 px-5 py-6 lg:px-10 lg:py-8">
        <div className="text-large -mb-3 font-semibold">{title}</div>
        <div className="text-small flex flex-col gap-x-6 text-font/75 lg:flex-row">
          <div>{formatDate(createdAt)}</div>

          {/* <div>{`${fileExtension}; ${fileSize}`}</div> */}
        </div>
        <div>{content}</div>
        <div className="flex flex-col items-start gap-x-6">
          <DialogTrigger>
            {/* <Button variant="category-outline" endIcon={<ArrowRightIcon />}> */}
            {/*   {viewButtonText} */}
            {/* </Button> */}

            {/* TODO use our Button when it's updated to work with DialogTrigger */}
            <AriaButton className="flex h-auto w-fit items-center justify-center rounded-lg border-2 border-category-700 bg-transparent px-4 py-2 text-[1rem] font-semibold leading-[1.5rem] text-gray-700 outline-offset-4 hover:border-category-600 hover:text-gray-600 focus:border-category-800 focus:text-gray-800 lg:py-3">
              {viewButtonText}
            </AriaButton>

            <Modal>
              <Dialog title={title}>
                <OfficialBoardCardModalContent id={id} createdAt={createdAt} />
              </Dialog>
            </Modal>
          </DialogTrigger>
        </div>
      </div>
    </Panel>
  )
}
