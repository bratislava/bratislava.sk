import { ArrowRight, ChevronRight } from '@assets/images'
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
  income: number
): [number, boolean] => {
  const minimumWage = singleAdultValue + (adults - 1) * anotherAdultValue + children * childValue
  const canAccomodate = income >= minimumWage
  return [minimumWage, canAccomodate]
}

const MinimumCalculator = ({ className, singleAdultValue, anotherAdultValue, childValue }: IProps) => {
  const { t } = useTranslation('minimum-calculator')

  const [adults, setAdults] = React.useState('1')
  const [children, setChildren] = React.useState('0')
  const [income, setIncome] = React.useState('0')

  const [submitted, setSubmitted] = React.useState(false)

  const [livingWage, canAcommodate] = calculateLivingSituation(
    singleAdultValue,
    anotherAdultValue,
    childValue,
    Number(adults),
    Number(children),
    Number(income)
  )
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={cx('text-center bg-secondary text-font', className)}>
      <p className="text-lg font-semibold">{t('title')}</p>
      <p className="m-auto mt-6 w-10/12 pt-0.5 text-default font-medium">{t('description')}</p>
      <form className="mt-10 flex flex-col items-center gap-y-8 text-default font-medium" onSubmit={handleSubmit}>
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
        />

        <Button
          className="mt-6 bg-primary py-4 px-6 text-default font-semibold text-font"
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          type="submit"
        >
          {t('buttonText')}
        </Button>
      </form>

      {submitted && (
        <div className="mt-14">
          <p className="text-md font-semibold">{canAcommodate ? t('answerYes') : t('answerNo')}</p>
          <p className="m-auto mt-5 w-9/12 text-default">
            {canAcommodate
              ? t('answerDescriptionYes')
              : t('answerDescriptionNo').replace('XY', livingWage.toFixed(2).toString())}
          </p>
        </div>
      )}
    </div>
  )
}

interface IInputFieldProps {
  id: string
  label: string
  value: string
  onChange: (newValue: string) => void
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  ...rest
}: IInputFieldProps &
  Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>) => (
  <label className="flex flex-col items-center text-center" htmlFor={id}>
    {label}
    <Input
      id={id}
      value={value}
      onChange={(ev) => onChange(ev.target.value ?? '')}
      className="mt-3 box-border w-64 rounded-lg py-4 px-10 text-center"
      required
      type="number"
      min={0}
      {...rest}
    />
  </label>
)

export default MinimumCalculator
