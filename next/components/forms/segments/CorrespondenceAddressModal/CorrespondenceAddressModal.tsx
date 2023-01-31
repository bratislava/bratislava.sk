import CorrespondenceAddressForm, {
  CorrespondenceAddressData,
} from 'components/forms/segments/CorrespondenceAddressForm/CorrespondenceAddressForm'
import Modal from 'components/forms/widget-components/Modals/Modal'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: ({ data }: { data?: CorrespondenceAddressData }) => void
  defaultValues: CorrespondenceAddressData
}

const CorrespondenceAddressModal = ({ show, onClose, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation('forms')
  const [errorMessage, setErrorMessage] = useState('')

  const onHideErrorMessage = () => {
    setErrorMessage('')
  }

  return (
    <Modal
      divider
      header={t('correspondece_address_title')}
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      content={({ onSubmit }) =>
        CorrespondenceAddressForm({ onSubmit, errorMessage, defaultValues, onHideErrorMessage })
      }
      className="w-[592px]"
    />
  )
}

export default CorrespondenceAddressModal
