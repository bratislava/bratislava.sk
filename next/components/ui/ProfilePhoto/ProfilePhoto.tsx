import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import ArrowRight from '@assets/images/arrow-right.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import { Button } from '../Button/Button'
import { Field } from '../Field/Field'

export interface ProfilePhotoProps {
  className?: string
  profileImage?: File
  setProfileImage?: React.Dispatch<File> | undefined
}

// TODO Image Upload to DB
export const ProfilePhoto = ({ className, profileImage, setProfileImage }: ProfilePhotoProps) => {
  const { t } = useTranslation()

  return (
    <div className={cx(className, 'flex flex-col md:flex-row md:gap-x-8')}>
      <Field id="photo" title="Fotografia" className="text-20 max-w-md">
        {profileImage ? (
          <img className="h-48 w-40" alt="Not found" src={URL.createObjectURL(profileImage)} />
        ) : (
          <div id="photo" className="base-input relative h-48 w-40">
            <input
              type="file"
              className="absolute left-0 top-0 h-48 w-40 cursor-pointer appearance-none opacity-0"
              onChange={(event) => {
                if (event.target.files) setProfileImage?.(event.target.files[0])
              }}
            />
          </div>
        )}
      </Field>
      <Field className="flex max-w-xs flex-col gap-4 md:mt-16 md:pt-1">
        <p className="text-p2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu maecenas risus facilisis
          viverra quis dui nisl.
        </p>
        <p className="text-p2">{t('photoMaxSize')}</p>
        <Button
          type="button"
          className="relative w-44 lg:w-56"
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          variant="transparent"
        >
          <input
            type="file"
            className="absolute left-0 top-0 h-14 w-56 cursor-pointer opacity-0"
            onChange={(event) => {
              if (event.target.files) setProfileImage?.(event.target.files[0])
            }}
          />
          {t('uploadPhoto')}
        </Button>
      </Field>
    </div>
  )
}

export default ProfilePhoto
