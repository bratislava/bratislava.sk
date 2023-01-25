import cx from 'classnames'

interface UserProfileDetailViewRowProps {
  label: string
  value?: string | null
}
const UserProfileDetailViewRow = ({ label, value }: UserProfileDetailViewRowProps) => {
  return (
    <div className={cx('w-full flex flex-col gap-2', 'xs:flex-row')}>
      <span className="text-p2-semibold grow w-[50%]">{label}</span>
      <span className="text-p2 grow w-[49%]">{value ?? '-'}</span>
    </div>
  )
}

export default UserProfileDetailViewRow
