import { UserData } from '@utils/useAccount'
import { useTranslation } from 'next-i18next'

import InputField from '../../forms/widget-components/InputField/InputField'

interface UserProfileDetailEditProps {
  userData: UserData
}

const UserProfileDetailEdit = () => {
  const { t } = useTranslation('account')

  return (
    <div className="flex flex-col grow gap-6">
      <div className="w-56">
        <InputField label={t('profile_detail.titles_before_name')} size="small" />
      </div>
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow ">
          <InputField label={t('profile_detail.given_name')} />
        </div>
        <div className="grow ">
          <InputField label={t('profile_detail.family_name')} />
        </div>
      </div>
      <div className="w-56">
        <InputField label={t('profile_detail.titles_after_name')} size="small" />
      </div>
    </div>
  )
}

export default UserProfileDetailEdit
