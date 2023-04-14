import { ArrowRight, ChevronRight } from '@assets/images'
import MinusIcon from '@assets/images/minus.svg'
import PlusIcon from '@assets/images/plus.svg'
import { Button, Input } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { FormEvent } from 'react'

interface IProps {
  className?: string
  singleAdultValue: number
  anotherAdultValue: number
  childValue: number
}

const calculateLivingSituation = (
  singleAdultValue: number,
  anotherAdultValue: number,
  childValue: number,
  adults: number,
  children: number,
  income: number,
): [number, boolean] => {
  const minimumWage = singleAdultValue + (adults - 1) * anotherAdultValue + children * childValue
  const canAccomodate = income >= minimumWage
  return [minimumWage, canAccomodate]
}

interface IInputFieldProps {
  id: string
  label: string
  value: number
  onChange: (newValue: number) => void
  onAddSub: (newValue: number) => void
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  onAddSub,
  ...rest
}: IInputFieldProps &
  Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange'
  >) => (
  <label className="text-large flex flex-col items-center text-center" htmlFor={id}>
    {label}
    <div className="relative mt-3 flex items-center">
      <Button
        className="absolute left-4 flex h-8 w-8 cursor-pointer items-center justify-center shadow-none"
        onClick={() => onAddSub(value - 1)}
        variant="full-transparent"
      >
        <MinusIcon />
      </Button>
      <Input
        id={id}
        value={value}
        onChange={(e) => {
          if (e.target.value === '' || /^[\d\b]+$/.test(e.target.value)) {
            onChange(parseInt(e.target.value, 10))
          }
        }}
        className="number-control-none text-large box-border w-64 rounded-lg px-10 py-4 text-center"
        required
        type="number"
        min={0}
        {...rest}
      />
      <Button
        className="absolute right-4 flex h-8 w-8 cursor-pointer items-center justify-center shadow-none"
        onClick={() => onAddSub(value + 1)}
        variant="full-transparent"
      >
        <PlusIcon />
      </Button>
    </div>
  </label>
)

const MinimumCalculator = ({
  className,
  singleAdultValue,
  anotherAdultValue,
  childValue,
}: IProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'MinimumCalculator' })

  const [adults, setAdults] = React.useState(1)
  const [children, setChildren] = React.useState(0)
  const [income, setIncome] = React.useState(0)

  const [submitted, setSubmitted] = React.useState(false)

  const [livingWage, canAcommodate] = calculateLivingSituation(
    singleAdultValue,
    anotherAdultValue,
    childValue,
    Number(adults),
    Number(children),
    Number(income),
  )
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={cx('bg-category-200 text-center text-font', className)}>
      <p className="text-h3">{t('title')}</p>
      <p className="text-large m-auto mt-6 w-10/12 pt-0.5 font-medium">{t('description')}</p>
      <form
        className="text-large mt-10 flex flex-col items-center gap-y-8 font-medium"
        onSubmit={handleSubmit}
      >
        <InputField
          id="adults"
          label={t('adultsText')}
          value={adults}
          onChange={(v) => {
            setAdults(v)
            setSubmitted(false)
          }}
          placeholder={t('placeholder')}
          min={1}
          onAddSub={(v) => {
            setAdults(v > 0 ? v : adults)
          }}
        />

        <InputField
          id="children"
          label={t('childrenText')}
          value={children}
          onChange={(v) => {
            setChildren(v)
            setSubmitted(false)
          }}
          placeholder={t('placeholder')}
          onAddSub={(v) => {
            setChildren(v >= 0 ? v : children)
          }}
        />

        <InputField
          id="income"
          label={t('incomeText')}
          value={income}
          onChange={(v) => {
            setIncome(v)
            setSubmitted(false)
          }}
          placeholder={t('placeholder')}
          step="0.01"
          onAddSub={(v) => {
            setIncome(v >= 0 ? v : income)
          }}
        />

        <Button
          className="text-large mt-6 bg-category-600 px-5 py-3 font-semibold text-font lg:px-6 lg:py-4"
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          type="submit"
        >
          {t('buttonText')}
        </Button>
      </form>

      {submitted && (
        <div className="mt-14">
          <p className="text-h4">{canAcommodate ? t('answerYes') : t('answerNo')}</p>
          <p className="text-large-respo m-auto mt-5 w-9/12">
            {canAcommodate
              ? t('answerDescriptionYes')
              : t('answerDescriptionNo').replace('XY', livingWage.toFixed(2).toString())}
          </p>
        </div>
      )}
    </div>
  )
}

export default MinimumCalculator
