import CloseIcon from '@assets/images/close.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import ChevronDown from '../../../assets/images/forms/chevron-down.svg'
import { useClickOutsideHandler } from '../../utils/ClickOutsideHandler/useClickOutsideHandler'
import { StepData } from '../types/TransformedFormData'
import StepperViewList from './StepperViewList'
import StepperViewRow from './StepperViewRow'

interface StepperViewProps {
  steps: StepData[]
  currentStep: number
  forceMobileSize?: boolean
  onChangeStep?: (stepIndex: number) => void
}

const StepperView = ({ steps, currentStep, forceMobileSize, onChangeStep }: StepperViewProps) => {
  const { t } = useTranslation('forms')
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false)

  const handleDropdownClick = () => {
    setIsClickedOutside(true)
    setIsCollapsed((state) => !state)
    setTimeout(() => setIsClickedOutside(false), 200)
  }
  const { clickOutsideRef } = useClickOutsideHandler(handleDropdownClick)

  const handleOnClickDropdownIcon = () => {
    if (isCollapsed && !isClickedOutside) {
      setIsCollapsed(false)
    }
  }

  const handleOnChangeStep = (stepIndex: number) => {
    setIsCollapsed(true)
    if (onChangeStep) {
      onChangeStep(stepIndex)
    }
  }

  return (
    <>
      <div className={cx('hidden', { 'sm:block': !forceMobileSize })}>
        <StepperViewList steps={steps} currentStep={currentStep} onChangeStep={onChangeStep} />
      </div>
      <div
        className={cx('flex flex-col', { 'sm:hidden': !forceMobileSize })}
        onClick={handleOnClickDropdownIcon}
      >
        <div className="h-14 p-4 w-full bg-white flex flex-row items-center gap-5 drop-shadow-lg cursor-pointer">
          <StepperViewRow
            className="grow"
            title={steps[currentStep]?.title}
            order={currentStep + 1}
            isCurrent
            isLast
          />
          <ChevronDown className={cx({ 'rotate-180': !isCollapsed })} />
        </div>
        {!isCollapsed && (
          <div
            className="bg-gray-200 inset-0 fixed mt-1 z-50 flex flex-col gap-0.5"
            ref={clickOutsideRef}
          >
            <div className="h-14 p-4 w-full bg-white flex flex-row items-center gap-1 drop-shadow-lg">
              <h6 className="text-h6 grow">{t('all_steps')}</h6>
              <div
                className="h-full cursor-pointer flex flex-col justify-center"
                onClick={() => setIsCollapsed(true)}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="bg-white grow">
              <StepperViewList
                steps={steps}
                currentStep={currentStep}
                onChangeStep={handleOnChangeStep}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default StepperView
