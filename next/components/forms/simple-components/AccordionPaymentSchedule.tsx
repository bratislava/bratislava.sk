import CalendarSchedule from '@assets/images/account/calendar-schedule.svg'
import ExpandMore from '@assets/images/expand-more.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import PersonIcon from '../icon-components/PersonIcon'
import AccountMarkdownModal from '../segments/AccountModal/AccountModal'
import Button from './Button'

export type AccordionSizeType = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionBase = {
  size: AccordionSizeType
  title: string
  data: any
  icon?: boolean
  shadow?: boolean
  className?: string
}
export const isAccordionSizeType = (size: string) =>
  ['xs', 'sm', 'md', 'lg'].includes(size) ? size : 'sm'

const PaymentScheduleView = (props: any) => {
  const { t } = useTranslation('account')
  return (
    <div className="no-scrollbar flex flex-col items-start lg:gap-6 gap-4 w-full overflow-auto">
      <div className="flex flex-col items-start lg:gap-6 gap-4 w-full">
        <div className="flex lg:hidden flex-col w-full gap-4">
          <div className={cx('text-h6-normal flex')}>
            <div className={cx('text-h6-normal grow')}>
              {t('payment_schedule.three_pieces')}
              <div className="inline">{t('payment_schedule.paid_at_once')}</div>
              {t('payment_schedule.not_later')}
            </div>
          </div>
          <div id="divider" className="w-full h-0.5 bg-gray-200" />
        </div>
        <div className=" flex md:flex-row flex-col items-center lg:gap-6 gap-4 w-full">
          <div className="text-h6 font-semibold md:text-h-md grow">{t('tax_determined')}</div>
          <Button
            variant="black-outline"
            text="Pridať termíny do kalendára"
            startIcon={<CalendarSchedule className="w-6 h-6" />}
            className="lg:w-max w-full"
          />
        </div>
        <div className="flex flex-col items-start p-6 lg:gap-6 gap-4 w-full bg-gray-50 rounded-lg">
          <div id="content" className="flex lg:flex-row flex-col items-start lg:gap-6 gap-3 w-full">
            <div className="grow items-start">
              {t('payment_schedule.first_piece')}{' '}
              <div className="text-h5 inline">{t('payment_schedule.first_piece_to')}</div>
              {t('validity_decision')}
            </div>
            <div className="text-h5">29,66 €</div>
          </div>
          <div id="divider" className="w-full h-0.5 bg-gray-200" />
          <div id="content" className="flex lg:flex-row flex-col items-start lg:gap-6 gap-3 w-full">
            <div className="grow items-start">
              {t('payment_schedule.second_piece')}
              <div className="text-h5 inline">{t('payment_schedule.second_piece_to')}</div>
            </div>
            <div className="text-h5">29,66 €</div>
          </div>
          <div id="divider" className="w-full h-0.5 bg-gray-200" />
          <div id="content" className="flex lg:flex-row flex-col items-start lg:gap-6 gap-3 w-full">
            <div className="grow items-start">
              {t('payment_schedule.third_piece')}
              <div className="text-h5 inline">{t('payment_schedule.third_piece_to')}</div>
            </div>
            <div className="text-h5">29,66 €</div>
          </div>
        </div>
      </div>
      <div className="gap-3 lg:gap-0 flex flex-col">
        <div className="text-h5">{t('payment_schedule.pay_with_qr')}</div>
        <div className="text-h5-normal">{t('payment_schedule.change_amount')}</div>
      </div>
    </div>
  )
}

const AccordionPaymentSchedule = ({
  title,
  size = 'sm',
  icon = false,
  shadow = false,
  className,
}: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionSize = isAccordionSizeType(size) as AccordionSizeType

  const paddingStyles = cx({
    'px-4 py-3 lg:p-4': accordionSize === 'xs',
    'p-4 lg:p-5': accordionSize === 'sm',
    'p-4 lg:py-6 lg:px-8': accordionSize === 'md',
    'py-5 px-6 lg:py-8 lg:px-10': accordionSize === 'lg',
  })

  const accordionHeaderStyle = cx(
    'flex flex-col gap-4 w-full rounded-xl bg-gray-0',
    className,
    paddingStyles,
  )
  const accordionContainerStyle = cx(
    'border-gray-200 flex flex-col w-full rounded-xl bg-gray-0',
    className,
    {
      'border-2 border-solid hover:border-gray-500': !shadow,
      'hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.08)]': shadow,
      'shadow-[0_0_16px_0_rgba(0,0,0,0.08)]': isActive && shadow,
      'shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]': !isActive && shadow,
    },
  )
  const { t } = useTranslation('account')
  return (
    <div className="h-auto w-full">
      <div className="lg:hidden block">
        <AccountMarkdownModal
          show={isActive}
          onClose={() => setIsActive(false)}
          content={<PaymentScheduleView />}
          onSubmit={() => {}}
          header={title}
        />
      </div>
      <div className={accordionContainerStyle}>
        <div className={cx('flex gap-4', accordionHeaderStyle)}>
          {icon && (
            <div
              className={cx('flex lg:items-start items-center justify-center', {
                'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                'w-8 h-8': accordionSize === 'md',
                'w-10 h-10': accordionSize === 'lg',
              })}
            >
              <PersonIcon
                className={cx('', {
                  'w-4 h-4': accordionSize === 'sm' || accordionSize === 'xs',
                  'w-5 h-5': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'lg',
                })}
              />
            </div>
          )}
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <div
              role="button"
              tabIndex={0}
              className="flex cursor-pointer lg:items-start items-center gap-4"
              onClick={() => setIsActive(!isActive)}
              onKeyDown={() => setIsActive(!isActive)}
            >
              <div className="flex grow sm:flex-row flex-col items-start">
                <div className="flex flex-col grow items-start">
                  <div
                    className={cx('flex grow w-full', {
                      'text-h6': accordionSize === 'xs',
                      'text-h5': accordionSize === 'sm',
                      'text-h4': accordionSize === 'md',
                      'text-h3': accordionSize === 'lg',
                    })}
                  >
                    {title}
                  </div>
                  <div className={cx('text-20 flex grow w-full lg:block hidden')}>
                    {t('payment_schedule.three_pieces')}
                    <div className="text-h5 inline">{t('payment_schedule.paid_at_once')}</div>
                    {t('payment_schedule.not_later')}
                  </div>
                </div>
              </div>
              <ExpandMore
                className={cx('flex items-center justify-center', {
                  'lg:w-10 lg:h-10 w-8 h-8': accordionSize === 'lg',
                  'lg:w-8 lg:h-8 w-6 h-6': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                })}
              />
            </div>
          </div>
        </div>
        <div
          className={cx('h-0.5 w-full bg-gray-200', {
            hidden: !isActive,
          })}
        />
        {isActive && (
          <div
            className={cx('flex flex-col font-normal lg:block hidden', paddingStyles, {
              'text-h6': accordionSize === 'sm' || accordionSize === 'xs',
              'text-20': accordionSize === 'lg' || accordionSize === 'md',
            })}
          >
            <PaymentScheduleView />
          </div>
        )}
      </div>
    </div>
  )
}

export default AccordionPaymentSchedule
