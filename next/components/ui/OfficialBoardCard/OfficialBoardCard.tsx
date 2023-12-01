// @ts-strict-ignore
import { ArrowRightIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
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
        <Typography type="p" size="p-large" fontWeight="semibold" className="-mb-3">
          {title}
        </Typography>
        <div className="flex flex-col gap-x-6 lg:flex-row">
          <Typography type="p" size="p-small" fontWeight="light">
            {formatDate(createdAt)}
          </Typography>

          {/* <div>{`${fileExtension}; ${fileSize}`}</div> */}
        </div>

        <Typography type="p">{content}</Typography>
        <div className="flex flex-col items-start gap-x-6">
          <DialogTrigger>
            {/* TODO: BUTTON TEST */}
            <Button variant="category-outline" endIcon={<ArrowRightIcon />}>
              {viewButtonText}
            </Button>

            {/* TODO: DELETE AFTER TEST */}
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
