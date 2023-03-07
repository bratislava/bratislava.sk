type AccountSectionHeaderBase = {
  title: string
  text?: string
}

const AccountSectionHeader = (props: AccountSectionHeaderBase) => {
  const { title, text } = props
  return (
    <div className="bg-gray-50 mt-16 lg:mt-28">
      <span className="flex flex-col justify-end w-full h-full max-w-screen-lg m-auto pl-4 lg:px-0 py-6 lg:py-16">
        <h1 className="text-h1">{title}</h1>
        {text && <p className="text-p1 mt-3">{text}</p>}
      </span>
    </div>
  )
}

export default AccountSectionHeader
