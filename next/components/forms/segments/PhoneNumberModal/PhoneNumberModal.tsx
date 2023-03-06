import { AccountError } from '@utils/useAccount'
import Modal from 'components/forms/widget-components/Modals/Modal'
import { useTranslation } from 'next-i18next'

import PhoneNumberForm, { PhoneNumberData } from '../PhoneNumberForm/PhoneNumberForm'

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: ({ data }: { data?: PhoneNumberData }) => void
  defaultValues: PhoneNumberData
  error?: AccountError | null
  onHideError?: () => void
}

const PhoneNumberModal = ({
  show,
  onClose,
  onSubmit,
  error,
  onHideError,
  defaultValues,
}: Props) => {
  const { t } = useTranslation('forms')

  return (
    <Modal
      divider
      header={t('adding_phone_number_title')}
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      content={({ onSubmit }) => PhoneNumberForm({ error, onHideError, onSubmit, defaultValues })}
      className="w-[592px] sm:h-max h-full"
    />
  )
}

export default PhoneNumberModal
