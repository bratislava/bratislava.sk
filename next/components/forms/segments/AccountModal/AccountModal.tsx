import Modal from 'components/forms/widget-components/Modals/Modal'
import { ReactElement } from 'react'

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: () => void
  content: ReactElement
  header: string
}

const AccountModal = ({ show, onClose, content, header, onSubmit }: Props) => {
  return (
    <Modal
      divider
      header={header}
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      content={() => content}
      className="h-full w-full"
    />
  )
}

export default AccountModal
