import Modal from 'components/forms/widget-components/Modals/Modal'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import PhoneNumberForm, { PhoneNumberData } from '../PhoneNumberForm/PhoneNumberForm'

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: ({ data }: { data?: PhoneNumberData }) => void
  defaultValues: PhoneNumberData
}

const PhoneNumberModal = ({ show, onClose, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation('forms')
  const [errorMessage, setErrorMessage] = useState('')

  const onHideErrorMessage = () => {
    setErrorMessage('')
  }

  return (
    <Modal
      divider
      header={t('adding_phone_number_title')}
      show={show}
      onClose={onClose}
      onSubmit={onSubmit}
      content={({ onSubmit }) =>
        PhoneNumberForm({ onSubmit, errorMessage, defaultValues, onHideErrorMessage })
      }
      className="w-[592px] sm:h-max h-full"
    />
  )
}

export default PhoneNumberModal
