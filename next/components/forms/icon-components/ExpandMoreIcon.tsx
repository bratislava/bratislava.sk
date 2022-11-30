import React from 'react'

type ExpandMoreIconProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const ExpandMoreIcon = ({ size = 'sm',className }: ExpandMoreIconProps) => {
  if (size === 'md'){
    return (
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14.1133 0.446716L8 6.56005L1.88667 0.446716L0 2.33338L8 10.3334L16 2.33338L14.1133 0.446716Z" fill="#D83728"/>
      </svg>
    )
  }
  if (size === 'lg'){
    return (
      <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.6417 0.308395L10 7.95006L2.35833 0.308395L0 2.66673L10 12.6667L20 2.66673L17.6417 0.308395Z" fill="#D83728"/>
      </svg>
    )
  }
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.585 0.585022L6 5.17002L1.415 0.585022L0 2.00002L6 8.00002L12 2.00002L10.585 0.585022Z" fill="#D83728"/>
    </svg>
  )
}

export default ExpandMoreIcon