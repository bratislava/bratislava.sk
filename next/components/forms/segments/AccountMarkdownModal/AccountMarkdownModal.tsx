import Modal from 'components/forms/widget-components/Modals/Modal'

import AccountMarkdownTable from '../AccountMarkdown/AccountMarkdownTable'

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: () => void
  content: string
  header: string
}

const AccountMarkdownModal = ({ show, onClose, content, header, onSubmit }: Props) => {
  return (
    <Modal
      divider
      header={header}
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      content={() => AccountMarkdownTable({ content })}
      className="h-full w-full"
    />
  )
}

export default AccountMarkdownModal
