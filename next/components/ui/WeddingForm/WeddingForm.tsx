import Calendar from '@assets/images/calendar-form.svg'
import { LocalDate } from '@js-joda/core'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Button } from '../Button/Button'
import { CheckBox } from '../CheckBox/CheckBox'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { InputAccessory } from '../InputAccessory/InputAccessory'
import { TextArea } from '../TextArea/TextArea'
import { Tooltip } from '../Tooltip/Tooltip'

export interface WeddingFormValues {
  name: string
  email: string
  phone: string
  notes: string
  date: string
  acceptTerms: boolean
}

export const WeddingForm = () => {
  // const [validate, { errors, clearErrors }] =
  //   useValidation<ReservationFormValues>(validateReservationForm);

  // TODO: From DB
  const [reservationFormValues, setReservationFormValues] = React.useState<WeddingFormValues>({
    name: '',
    email: '@',
    phone: '',
    notes: '',
    date: LocalDate.now().toJSON(),
    acceptTerms: false,
  })

  const { t } = useTranslation()

  const handleChange = (change: Partial<WeddingFormValues>) => {
    // Object.keys(change).forEach((key) =>
    //   clearErrors(key as keyof ReservationFormValues)
    // );
    setReservationFormValues((o) => ({ ...o, ...change }))
  }

  // TODO: update plugin to grid columns

  return (
    <div className="z-10 mx-auto w-10/12">
      <h1 className="text-h1 text-center">{t('nonbindingWedding')}</h1>

      <p className="text-p1-medium text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis non vitae ultrices sit
        lobortis arcu.
      </p>

      <form>
        <div className="flex flex-col gap-x-8 md:flex-row">
          <div className="grow">
            <Field
              id="firstname"
              title="Meno"
              // error={errors?.name}
              className="w-full"
            >
              <Input
                id="firstname"
                name="firstname"
                type="text"
                className="text-20"
                // hasError={!!errors?.name}
                value={reservationFormValues?.name}
                onChange={(e) => handleChange({ name: e.target.value })}
              />
            </Field>
            <Field
              id="lastname"
              title="Priezvisko"
              // error={errors?.name}
              className="w-full"
            >
              <Input
                id="lastname"
                name="lastname"
                type="text"
                className="text-20"
                // hasError={!!errors?.name}
                value={reservationFormValues?.name}
                onChange={(e) => handleChange({ name: e.target.value })}
              />
            </Field>
            <Field
              id="email"
              title="E-mail"
              className="w-full"
              // error={errors?.email}
            >
              <Input
                id="email"
                name="email"
                type="email"
                className="text-20"
                // hasError={!!errors?.email}
                value={reservationFormValues?.email}
                onChange={(e) => handleChange({ email: e.target.value })}
              />
            </Field>

            <Field
              id="phone"
              title="Telefón"
              className="w-full"
              // error={errors?.phone}
            >
              <Input
                id="phone"
                name="phone"
                type="phone"
                className="text-20"
                placeholder="+421 111 222 333"
                // hasError={!!errors?.email}
                value={reservationFormValues?.phone}
                onChange={(e) => handleChange({ phone: e.target.value })}
              />
            </Field>
          </div>

          <div className="grow">
            <Field
              id="date"
              title="Termín"
              className="w-full"
              // error={errors?.email}
            >
              <InputAccessory
                className="flex w-full justify-between text-category-600"
                iconPosition="right"
                icon={<Calendar />}
              >
                <Input
                  id="date"
                  name="date"
                  type="date"
                  min={LocalDate.now().toJSON()}
                  className="text-20 h-12 w-full text-font focus:outline-none"
                  // hasError={!!errors?.email}
                  value={reservationFormValues?.date}
                  onChange={(e) => handleChange({ date: e.target.value })}
                />
              </InputAccessory>
            </Field>
            <Field
              id="notes"
              title="Poznámky"
              className="w-full"
              tooltip={<Tooltip variant="primary" content="TODO" />}
              // error={errors?.email}
            >
              <TextArea
                id="notes"
                name="notes"
                className="text-20 pb-3.5 pt-5"
                rows={11}
                // hasError={!!errors?.email}
                value={reservationFormValues?.notes}
                onChange={(e) => handleChange({ notes: e.target.value })}
              />
            </Field>
          </div>
        </div>

        <div className="flex justify-center">
          <Field id="terms" className="w-full text-center">
            <CheckBox
              className="py-3 md:gap-x-6"
              id="terms"
              content="Oboznámil/a som sa so všeobecnými obchodnými podmienkami."
              checked={reservationFormValues?.acceptTerms}
              onChange={(e) => handleChange({ acceptTerms: e.target.checked })}
            />
          </Field>
        </div>

        <div className="flex justify-center">
          <Button className="text-20-medium mt-8 h-12 w-3/12 lg:mt-10">
            {t('nonbindingWeddingConfirm')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default WeddingForm
