import React from 'react'

export const AccountContainer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="md:py-8 md:px-10 mx-auto">
    <div className="rounded-lg bg-white py-8 px-6 shadow md:px-12 md:py-10 md:w-[696px]">
      {children}
    </div>
  </div>
)

export default AccountContainer
