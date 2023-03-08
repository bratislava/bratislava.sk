import BratislavaIcon from '@assets/images/account/bratislava-footer.svg'
import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import ThankYouCard from 'components/forms/segments/AccountSections/ThankYouSection/ThankYouCard'
import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'

const ThankYouSection = () => {
  const { t } = useTranslation('account')
  const [isOn, setIsOn] = useState<'success' | 'error-1' | 'error-2' | 'error-3' | 'error-4'>(
    'error-1',
  )

  const switcher = (): ReactNode => {
    const array: {
      status: 'success' | 'error-1' | 'error-2' | 'error-3' | 'error-4'
      title: string
    }[] = [
      {
        status: 'success',
        title: 'Success',
      },
      {
        status: 'error-1',
        title: 'Error 1',
      },
      {
        status: 'error-2',
        title: 'Error 2',
      },
      {
        status: 'error-3',
        title: 'Error 3',
      },
      {
        status: 'error-4',
        title: 'Error 4',
      },
    ]

    return (
      <div className="flex flex-col w-full max-w-[734px] lg:max-w-[800px] m-auto mt-8 px-4 md:px-0">
        <span className="text-p2-semibold mb-2">Temporary switcher</span>
        <div className="flex flex-wrap">
          {array.map((item) => (
            <button
              type="button"
              key={item.status}
              onClick={() => setIsOn(item.status)}
              className={cx('w-max h-6 flex justify-center items-center px-4 py-4 cursor-pointer', {
                'bg-gray-200': isOn !== item.status,
                'bg-gray-700 text-gray-100': isOn === item.status,
              })}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-0 md:bg-gray-50 pt-16 md:pt-28 flex flex-col justify-between">
      <div className="flex flex-col">
        {isOn === 'success' && (
          <ThankYouCard
            status="success"
            title={t('thank_you.success.title')}
            content={t('thank_you.success.content')}
          />
        )}
        {isOn === 'error-1' && (
          <ThankYouCard
            status="error-1"
            title={t('thank_you.error.1.title')}
            content={t('thank_you.error.1.content')}
          />
        )}
        {isOn === 'error-2' && (
          <ThankYouCard
            status="error-2"
            title={t('thank_you.error.2.title')}
            content={t('thank_you.error.2.content')}
          />
        )}
        {isOn === 'error-3' && (
          <ThankYouCard
            status="error-3"
            title={t('thank_you.error.3.title')}
            content={t('thank_you.error.3.content')}
          />
        )}
        {isOn === 'error-4' && (
          <ThankYouCard
            status="error-4"
            title={t('thank_you.error.4.title')}
            content={t('thank_you.error.4.content')}
          />
        )}
        <div className="max-w-[734px] lg:max-w-[800px] w-full mx-auto mt-0 md:mt-10 px-4 md:px-0">
          <span className="text-p2 flex">
            <AccountMarkdown
              variant="sm"
              content={`<span className='text-p2'>V prípade akýchkoľvek otázok nás neváhajte kontaktovať na adrese:</span> <span className="text-p2-semibold underline">platbadane@bratislava.sk</span>`}
            />
          </span>
          <div className="flex flex-col gap-3 mt-4 md:mt-6">
            <Button
              label="Často kladené otázky"
              href="/account/i-have-a-problem"
              variant="link-black"
              size="sm"
            />
            <Button
              label="Ochrana osobných údajov"
              href="/ochrana-osobnych-udajov"
              variant="link-black"
              size="sm"
            />
          </div>
        </div>
        {switcher()}
      </div>

      <div className="w-full max-w-screen-lg mx-auto hidden lg:flex flex-col items-center gap-6 pb-6">
        <BratislavaIcon />
        <p className="text-p2">{t('thank_you.footer_text')}</p>
      </div>
    </div>
  )
}

export default ThankYouSection
