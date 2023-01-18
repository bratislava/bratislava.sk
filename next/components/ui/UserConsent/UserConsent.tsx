import { Consent } from '@bratislava/ui-bratislava/UserProfileConsents/UserProfileConsents'
import cx from 'classnames'

import Toggle from '../../forms/simple-components/Toggle'

interface UserConsentProps {
  consent: Consent
  isLast?: boolean
}

const UserConsent = ({ consent, isLast }: UserConsentProps) => {
  return (
    <div
      className={cx('flex flex-col border-gray-200 gap-2 py-4', 'xs:flex-row xs:py-6', {
        'border-b-2': !isLast,
      })}
    >
      <div className="w-full">
        <h5 className="text-h6">{consent.title}</h5>
        <p className="text-p2-normal">{consent.text}</p>
      </div>
      <div>
        <Toggle
          value="personalDataConsent"
          isSelected
          isDisabled={consent.isDisabled}
          isReadOnly={consent.isDisabled}
        />
      </div>
    </div>
  )
}

export default UserConsent
