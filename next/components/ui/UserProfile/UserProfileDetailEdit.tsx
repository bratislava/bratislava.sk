import { Address, UserData } from '@utils/useAccount'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'
import InputField from '../../forms/widget-components/InputField/InputField'

interface UserProfileDetailEditProps {
  temporaryUserData: UserData
  onChangeTemporary: (newTemporaryUserData: UserData) => void
}

const UserProfileDetailEdit = (props: UserProfileDetailEditProps) => {
  const { temporaryUserData, onChangeTemporary } = props
  const { t } = useTranslation('account')

  const handleOnChangeAddress = (newAddressInfo: Address) => {
    const newAddress: Address = { ...temporaryUserData.address, ...newAddressInfo }
    const newTemporaryUserData: UserData = { ...temporaryUserData, address: newAddress }
    onChangeTemporary(newTemporaryUserData)
  }

  return (
    <div className="flex flex-col grow gap-6">
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow ">
          <InputField
            label={t('profile_detail.given_name')}
            value={temporaryUserData.given_name || ''}
            onChange={(value) => onChangeTemporary({ ...temporaryUserData, given_name: value })}
          />
        </div>
        <div className="grow ">
          <InputField
            label={t('profile_detail.family_name')}
            value={temporaryUserData.family_name || ''}
            onChange={(value) => onChangeTemporary({ ...temporaryUserData, family_name: value })}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <div className="grow">
          <InputField
            label={t('profile_detail.email')}
            tooltip={t('profile_detail.email_tooltip')}
            value={temporaryUserData.email || ''}
            disabled
          />
        </div>
        <div className="justify-end flex flex-col py-1">
          <Button variant="black" size="sm" text={t('profile_detail.email_button')} />
        </div>
      </div>
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow ">
          <InputField
            label={t('profile_detail.phone_number')}
            value={temporaryUserData.phone_number || ''}
            onChange={(value) => onChangeTemporary({ ...temporaryUserData, phone_number: value })}
          />
        </div>
        <div className="grow invisible h-0">
          <InputField label={t('profile_detail.phone_number')} />
        </div>
      </div>
      <div className="h-0 w-full border-b-2 border-gray-200" />
      <h5 className="text-h5">{t('profile_detail.address')}</h5>
      <InputField
        className="w-full"
        label={t('profile_detail.street')}
        value={temporaryUserData.address?.street_address || ''}
        onChange={(value) => handleOnChangeAddress({ street_address: value })}
      />
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow">
          <InputField
            label={t('profile_detail.city')}
            value={temporaryUserData.address?.locality || ''}
            onChange={(value) => handleOnChangeAddress({ locality: value })}
          />
        </div>
        <div className="w-52">
          <InputField
            label={t('profile_detail.postal_code')}
            value={temporaryUserData.address?.postal_code || ''}
            onChange={(value) => handleOnChangeAddress({ postal_code: value })}
          />
        </div>
      </div>
    </div>
  )
}

export default UserProfileDetailEdit
