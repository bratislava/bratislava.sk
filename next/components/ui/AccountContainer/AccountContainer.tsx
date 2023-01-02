import React from 'react'

export const AccountContainer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="py-8 px-6 md:px-10 mx-auto">
    <div className="rounded-lg bg-white py-8 px-6 shadow md:px-10">{children}</div>
  </div>
)

export default AccountContainer
