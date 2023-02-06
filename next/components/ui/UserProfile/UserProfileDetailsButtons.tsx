import CloseIcon from '@assets/images/close.svg'
import EditIcon from '@assets/images/forms/edit_icon.svg'
import WhiteEditIcon from '@assets/images/forms/edit_white.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'

interface UserProfileDetailsButtonsProps {
  isEditing?: boolean
  onChangeIsEditing: (isEditing: boolean) => void
  onCancelEditing: () => void
  onSubmitEditing: () => void
}

const UserProfileDetailsButtons = (props: UserProfileDetailsButtonsProps) => {
  const { isEditing, onChangeIsEditing, onCancelEditing, onSubmitEditing } = props
  const { t } = useTranslation('account')
  return (
    <div className="width-fit">
      {isEditing ? (
        <div className="flex flex-row gap-5 items-center">
          <Button
            className={cx('hidden', 'xs:block')}
            variant="plain-black"
            size="sm"
            text={t('profile_detail.stop_edit_button')}
            onPress={onCancelEditing}
          />
          <Button
            className={cx('hidden', 'xs:block')}
            variant="black"
            size="sm"
            text={t('profile_detail.save_edit_button')}
            onPress={onSubmitEditing}
          />
          <CloseIcon
            className={cx('block cursor-pointer', 'xs:hidden')}
            onClick={onCancelEditing}
          />
          <div
            className={cx(
              'fixed bottom-0 left-0 right-0 bg-white z-50 drop-shadow-2xl flex flex-row justify-center py-2',
              'xs:hidden',
            )}
          >
            <Button
              variant="black"
              size="sm"
              text={t('profile_detail.save_edit_button')}
              onPress={onSubmitEditing}
            />
          </div>
        </div>
      ) : (
        <div className="width-fit">
          <Button
            variant="black"
            startIcon={<WhiteEditIcon />}
            size="sm"
            text={t('profile_detail.start_edit_button')}
            className="hidden xs:block"
            onPress={() => onChangeIsEditing(true)}
          />
          <EditIcon
            className="block xs:hidden cursor-pointer"
            onClick={() => onChangeIsEditing(true)}
          />
        </div>
      )}
    </div>
  )
}

export default UserProfileDetailsButtons
