import { Typography } from '@bratislava/component-library'
import React, { FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'

import MinusIcon from '@/src/assets/images/minus.svg'
import PlusIcon from '@/src/assets/images/plus.svg'
import Button from '@/src/components/common/Button/Button'
import Input from '@/src/components/sections/CalculatorSection_Deprecated/Input_Deprecated'
import { useTranslation } from '@/src/utils/useTranslation'

type MinimumCalculatorProps = {
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

type InputFieldProps = {
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
}: InputFieldProps &
  Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange'
  >) => (
  <label className="text-large flex flex-col items-center text-center" htmlFor={id}>
    {label}
    <div className="relative mt-3 flex items-center">
      <Button
        className="absolute left-2 size-10 p-0"
        onPress={() => onAddSub(value - 1)}
        variant="outline"
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
        className="absolute right-2 size-10 p-0"
        onPress={() => onAddSub(value + 1)}
        variant="outline"
      >
        <PlusIcon />
      </Button>
    </div>
  </label>
)

const MinimumCalculator_Deprecated = ({
  className,
  singleAdultValue,
  anotherAdultValue,
  childValue,
}: MinimumCalculatorProps) => {
  const { t } = useTranslation()

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
    <div className={twMerge('bg-category-200 text-center text-font', className)}>
      <Typography variant="h3" as="h2">
        {t('MinimumCalculator.title')}
      </Typography>

      <Typography variant="p-default" className="m-auto mt-6 w-10/12 pt-0.5">
        {t('MinimumCalculator.description')}
      </Typography>
      <form
        className="text-large mt-10 flex flex-col items-center gap-y-8 font-medium"
        onSubmit={handleSubmit}
      >
        <InputField
          id="adults"
          label={t('MinimumCalculator.adultsText')}
          value={adults}
          onChange={(v) => {
            setAdults(v)
            setSubmitted(false)
          }}
          placeholder={t('MinimumCalculator.placeholder')}
          min={1}
          onAddSub={(v) => {
            setAdults(v > 0 ? v : adults)
          }}
        />

        <InputField
          id="children"
          label={t('MinimumCalculator.childrenText')}
          value={children}
          onChange={(v) => {
            setChildren(v)
            setSubmitted(false)
          }}
          placeholder={t('MinimumCalculator.placeholder')}
          onAddSub={(v) => {
            setChildren(v >= 0 ? v : children)
          }}
        />

        <InputField
          id="income"
          label={t('MinimumCalculator.incomeText')}
          value={income}
          onChange={(v) => {
            setIncome(v)
            setSubmitted(false)
          }}
          placeholder={t('MinimumCalculator.placeholder')}
          step="0.01"
          onAddSub={(v) => {
            setIncome(v >= 0 ? v : income)
          }}
        />

        <Button variant="solid" type="submit">
          {t('MinimumCalculator.buttonText')}
        </Button>
      </form>

      {submitted && (
        <div className="mt-14">
          {/* FIXME Typography. Convert to use Typography. Issue: Figma <p> different font size */}
          <p className="text-h4">
            {canAcommodate ? t('MinimumCalculator.answerYes') : t('MinimumCalculator.answerNo')}
          </p>
          <Typography variant="p-large" className="text-large m-auto mt-5 w-9/12">
            {canAcommodate
              ? t('MinimumCalculator.answerDescriptionYes')
              : t('MinimumCalculator.answerDescriptionNo').replace(
                  'XY',
                  livingWage.toFixed(2).toString(),
                )}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default MinimumCalculator_Deprecated
