import cx from 'classnames'
import React from 'react'

import { Card } from './Card'
import { CheckBox } from './CheckBox'

export interface NewsletterProps {
  className?: string
  imageSrc?: string
  checkBoxContent?: string
  newsLetterContent?: string
  buttonLabel?: string
}

// TODO needs to be reimplemented
export const NewsLetter = ({
  className,
  imageSrc,
  checkBoxContent,
  newsLetterContent,
  buttonLabel,
}: NewsletterProps) => {
  const [isChecked, setChecked] = React.useState(false)
  const [email, setEmail] = React.useState('@')
  const [isSubscribed, setSubscribed] = React.useState(false)

  const handleClick = () => {
    if (isChecked && email.length > 0) {
      console.log('Subscribed')
      setSubscribed(true)
    }
  }

  return (
    <div
      className={cx(
        className,
        'my-10 w-full max-w-xs px-2.5 pt-1 lg:my-12 lg:max-w-screen-md lg:px-0 lg:pr-9',
      )}
    >
      <Card
        hasButton
        buttonPosition="left-1/2 -translate-x-1/2 w-56 h-14 lg:translate-x-0 lg:left-10"
        topImage={imageSrc ? <img src={imageSrc} alt="Newsletter decoration" /> : undefined}
        topImagePosition="-left-2.5 lg:left-[492px] h-[180px] lg:h-[214px] w-80 lg:w-96 top-[-78px] lg:top-[59px] "
        className="flex h-auto flex-col"
        onButtonClick={handleClick}
        buttonContent={buttonLabel}
      >
        {/* Content */}
        <div className="mb-8 mt-32 p-6 lg:my-0 lg:p-12">
          <h2 className="text-h4">Newsletter</h2>
          <div className="text-default mt-5">{newsLetterContent}</div>
          <div className="mt-8 w-full pr-1 lg:w-80 lg:pr-3">
            <input
              type="email"
              className="w-full border-b-2 border-font focus:outline-none"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="mb-5 mt-8 max-w-xs">
            <CheckBox
              id="newsletterCheckbox"
              className="border-gray-700/50"
              variant="circle"
              content={
                <p
                  className={cx(
                    'text-default -mt-1',
                    { 'text-font': isChecked },
                    { 'text-font/50': !isChecked },
                  )}
                >
                  {checkBoxContent}
                </p>
              }
              onChange={(ev) => setChecked?.(ev.target.checked)}
              checked={isChecked}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NewsLetter
