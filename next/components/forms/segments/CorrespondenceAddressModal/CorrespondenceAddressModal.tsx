import CorrespondenceAddressForm, {
  CorrespondenceAddressData,
} from 'components/forms/segments/CorrespondenceAddressForm/CorrespondenceAddressForm'
import Modal from 'components/forms/widget-components/Modals/Modal'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

interface Props {
  show: boolean
  onClose: () => void
}

const CorrespondenceAddressModal = ({ show, onClose }: Props) => {
  const { t } = useTranslation('forms')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data: CorrespondenceAddressData) => {
    console.log(data)
  }

  const defaultValues = { streeAddress: 'w', locality: '', postalCode: '' }

  return (
    <Modal
      divider
      header={t('correspondece_address_title')}
      show={show}
      onClose={onClose}
      onSubmit={() => {
        alert('Modal submitted')
        // onSubmit()
      }}
      content={() => CorrespondenceAddressForm({ onSubmit, errorMessage, defaultValues })}
      className="w-[700px]"
    />
  )
}

export default CorrespondenceAddressModal
