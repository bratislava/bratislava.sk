import CloseIcon from '@assets/images/close.svg'
import EditIcon from '@assets/images/forms/edit_icon.svg'
import WhiteEditIcon from '@assets/images/forms/edit_white.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'

interface UserProfileDetailsButtonsProps {
  formId: string
  isEditing?: boolean
  onChangeIsEditing: (isEditing: boolean) => void
  onCancelEditing: () => void
}

const UserProfileDetailsButtons = (props: UserProfileDetailsButtonsProps) => {
  const { formId, isEditing, onChangeIsEditing, onCancelEditing } = props
  const { t } = useTranslation('account')

  return (
    <div className="width-fit">
      {isEditing ? (
        <div className="flex flex-row gap-5 items-center">
          <Button
            className={cx('hidden focus:bg-white h-full', 'sm:block')}
            variant="plain-black"
            size="sm"
            text={t('profile_detail.stop_edit_button')}
            onPress={onCancelEditing}
          />
          <Button
            className={cx('hidden', 'sm:block')}
            variant="black"
            size="sm"
            text={t('profile_detail.save_edit_button')}
            type="submit"
            form={formId}
          />
          <CloseIcon
            className={cx('block cursor-pointer', 'sm:hidden')}
            onClick={onCancelEditing}
          />
          <div
            className={cx(
              'fixed bottom-0 left-0 right-0 bg-white z-50 drop-shadow-2xl flex flex-row justify-center py-2',
              'sm:hidden',
            )}
          >
            <Button
              variant="black"
              size="sm"
              text={t('profile_detail.save_edit_button')}
              type="submit"
              form={formId}
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
            className="hidden sm:block"
            onPress={() => onChangeIsEditing(true)}
          />
          <EditIcon
            className="block sm:hidden cursor-pointer"
            onClick={() => onChangeIsEditing(true)}
          />
        </div>
      )}
    </div>
  )
}

export default UserProfileDetailsButtons
