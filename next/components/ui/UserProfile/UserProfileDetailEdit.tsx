import { UserData } from '@utils/useAccount'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'
import InputField from '../../forms/widget-components/InputField/InputField'

interface UserProfileDetailEditProps {
  userData: UserData
}

const UserProfileDetailEdit = () => {
  const { t } = useTranslation('account')

  return (
    <div className="flex flex-col grow gap-6">
      <InputField className="w-60" label={t('profile_detail.titles_before_name')} />
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow ">
          <InputField label={t('profile_detail.given_name')} />
        </div>
        <div className="grow ">
          <InputField label={t('profile_detail.family_name')} />
        </div>
      </div>
      <InputField className="w-60" label={t('profile_detail.titles_after_name')} />
      <div className="flex flex-row flex-wrap gap-4">
        <div className="grow">
          <InputField
            label={t('profile_detail.email')}
            tooltip={t('profile_detail.email_tooltip')}
            disabled
          />
        </div>
        <div className="justify-end flex flex-col py-1">
          <Button variant="black" size="sm" text={t('profile_detail.email_button')} />
        </div>
      </div>
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow ">
          <InputField label={t('profile_detail.phone_number')} />
        </div>
        <div className="grow invisible h-0">
          <InputField label={t('profile_detail.phone_number')} />
        </div>
      </div>
    </div>
  )
}

export default UserProfileDetailEdit
