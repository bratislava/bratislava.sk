import cx from 'classnames'

import Tooltip from '../../forms/info-components/Tooltip/Tooltip'

interface UserProfileDetailViewRowProps {
  label: string
  value?: string | null
  tooltip?: string
}
const UserProfileDetailViewRow = ({ label, value, tooltip }: UserProfileDetailViewRowProps) => {
  return (
    <div className={cx('w-full flex-wrap flex flex-col gap-2', 'sm:flex-row')}>
      <div className="grow w-[50%] flex flex-row items-center gap-3">
        <span className="text-p2-semibold">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <span className="text-p2 grow w-[49%]">{value || '-'}</span>
    </div>
  )
}

export default UserProfileDetailViewRow
