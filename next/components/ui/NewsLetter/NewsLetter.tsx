import React from 'react';
import cx from 'classnames';
import { Card } from '../Card/Card';
import { CheckBox } from '../CheckBox/CheckBox';

export interface NewsletterProps {
  className?: string;
  imageSrc?: string;
  checkBoxContent?: string;
  newsLetterContent?: string;
  buttonLabel?: string;
}

export const NewsLetter = ({
  className,
  imageSrc,
  checkBoxContent,
  newsLetterContent,
  buttonLabel,
}: NewsletterProps) => {
  const [isChecked, setChecked] = React.useState(false);
  const [email, setEmail] = React.useState('@');
  const [isSubscribed, setSubscribed] = React.useState(false);

  const handleClick = () => {
    if (isChecked && email.length !== 0) {
      console.log('Subscribed');
      setSubscribed(true);
    }
  };

  return (
    <div
      className={cx(
        className,
        'max-w-xs w-full px-2.5 lg:px-0 my-10 lg:my-12 pt-1 lg:max-w-3xl lg:pr-9'
      )}
    >
      <Card
        hasButton
        buttonPosition="left-1/2 -translate-x-1/2 w-56 h-14 lg:translate-x-0 lg:left-10"
        topImage={
          imageSrc ? (
            <img src={imageSrc} alt="Newsletter decoration" />
          ) : undefined
        }
        topImagePosition="left-[-10px] lg:left-[492px] h-[180px] lg:h-[214px] w-[320px] lg:w-[382px] top-[-78px] lg:top-[59px] "
        className="flex flex-col h-auto"
        onButtonClick={handleClick}
        buttonContent={buttonLabel}
      >
        {/* Content */}
        <div className="mt-30 mb-8 lg:mb-0 lg:mt-0 p-6 lg:p-12">
          <h2 className="font-semibold text-md">Newsletter</h2>
          <div className="text-base mt-5">{newsLetterContent}</div>
          <div className="w-full pr-1 lg:w-80 lg:pr-3 mt-8">
            <input
              type="email"
              className="border-b-2 border-font focus:outline-none w-full"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="mt-8 mb-5 max-w-xs">
            <CheckBox
              id="newsletterCheckbox"
              className="border-gray-light border-opacity-50"
              variant="circle"
              content={
                <p
                  className={cx(
                    'text-base -mt-1',
                    { 'text-font': isChecked },
                    { 'text-gray-light': !isChecked }
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
  );
};

export default NewsLetter;
