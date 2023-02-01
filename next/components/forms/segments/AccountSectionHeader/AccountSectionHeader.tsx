type AccountSectionHeaderBase = {
  title: string
}

const AccountSectionHeader = (props: AccountSectionHeaderBase) => {
  const { title } = props
  return (
    <div className="bg-gray-50 h-[136px] mt-16 lg:mt-28">
      <span className="text-h1 flex items-end w-full h-full max-w-screen-1.5lg m-auto pb-8 pl-8 lg:pl-0">
        {title}
      </span>
    </div>
  )
}

export default AccountSectionHeader
