import { SectionItemBase } from 'components/forms/types/AccountTypes'
import { useRouter } from 'next/router'
import React from 'react'

type AccountSectionHeaderBase = {
  sectionsList: SectionItemBase[]
}

const AccountSectionHeader = (props: AccountSectionHeaderBase) => {
  const { sectionsList } = props
  const router = useRouter()
  return (
    <div className="bg-gray-50 h-[136px] mt-28">
      <span className="text-h1 flex items-end w-full h-full max-w-screen-1.5lg m-auto pb-8">
        {sectionsList.find((section) => router.route.includes(section.link))?.title}
      </span>
    </div>
  )
}

export default AccountSectionHeader
