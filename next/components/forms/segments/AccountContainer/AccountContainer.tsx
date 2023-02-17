import React from 'react'

export const AccountContainer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="md:py-8 md:px-10 mx-auto w-full max-w-[696px]">
    <div className="md:rounded-lg bg-white py-6 px-4 md:shadow md:px-12 md:py-10">{children}</div>
  </div>
)

export default AccountContainer
