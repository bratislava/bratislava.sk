import { EyeIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import Dialog from '@components/ui/ModalDialog/Dialog'
import Modal from '@components/ui/ModalDialog/Modal'
import OfficialBoardCardModalContent from '@components/ui/OfficialBoardCard/OfficialBoardCardModalContent'
import { formatDate } from '@utils/local-date'
import React from 'react'
import { DialogTrigger } from 'react-aria-components'

import { Panel } from '../Panel/Panel'

export type OfficialBoardCardProps = {
  title: string
  id: string
  createdAt: string
  content: string
  className?: string
  viewButtonText: string
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
            <Button variant="category-outline" endIcon={<EyeIcon />}>
              {viewButtonText}
            </Button>

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
