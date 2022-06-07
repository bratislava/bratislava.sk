import cx from 'classnames'
import { Button } from '../Button/Button'
import { ReactComponent as ChevronRight } from '../../../assets/images/chevron-right.svg'
import { ReactComponent as ArrowRight } from '../../../assets/images/arrow-right.svg'
import { Field } from '../Field/Field'

export interface ProfilePhotoProps {
  className?: string
  profileImage?: File
  setProfileImage?: React.Dispatch<File> | undefined
}
// TODO Image Upload to DB
export const ProfilePhoto = ({ className, profileImage, setProfileImage }: ProfilePhotoProps) => {
  return (
    <div className={cx(className, 'flex flex-col md:flex-row md:gap-x-8')}>
      <Field id="photo" title="Fotografia" className="text-default max-w-md">
        {profileImage ? (
          <img className="w-40 h-48" alt="Not found" src={URL.createObjectURL(profileImage)} />
        ) : (
          <div id="photo" className="relative base-input w-40 h-48">
            <input
              type="file"
              className="appearance-none absolute left-0 top-0 opacity-0 cursor-pointer w-40 h-48"
              onChange={(event) => {
                if (event.target.files) setProfileImage?.(event.target.files[0])
              }}
            />
          </div>
        )}
      </Field>
      <Field className="max-w-xs flex flex-col gap-4 md:mt-16 md:pt-1">
        <p className="text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu maecenas risus facilisis viverra quis dui nisl.
        </p>
        <p className="text-sm">Maximálna veľkosť 2MB</p>
        <Button
          type="button"
          className="relative w-44 lg:w-56"
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          variant="transparent"
        >
          <input
            type="file"
            className="absolute left-0 top-0 opacity-0 cursor-pointer w-56 h-14"
            onChange={(event) => {
              if (event.target.files) setProfileImage?.(event.target.files[0])
            }}
          />
          Nahrať foto
        </Button>
      </Field>
    </div>
  )
}

export default ProfilePhoto
