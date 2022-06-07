import { DateTimeFormatter, LocalDate } from '@js-joda/core'
import React from 'react'
import cx from 'classnames'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { Select } from '../Select/Select'
import { TextArea } from '../TextArea/TextArea'
import { InputAccessory } from '../InputAccessory/InputAccessory'
import { CheckBox } from '../CheckBox/CheckBox'
import { Button } from '../Button/Button'
import { ReactComponent as Calendar } from '../../../assets/images/calendar-form.svg'
import { Tooltip } from '../Tooltip/Tooltip'

interface IProps {
  className?: string
}

export interface WeddingFormValues {
  name: string
  email: string
  phone: string
  notes: string
  date: string
  acceptTerms: boolean
}

export const WeddingForm = ({ className }: IProps) => {
  // const [validate, { errors, clearErrors }] =
  //   useValidation<ReservationFormValues>(validateReservationForm);

  //TODO: From DB
  const [reservationFormValues, setReservationFormValues] = React.useState<WeddingFormValues>({
    name: '',
    email: '@',
    phone: '',
    notes: '',
    date: LocalDate.now().toJSON(),
    acceptTerms: false,
  })

  const handleChange = (change: Partial<WeddingFormValues>) => {
    // Object.keys(change).forEach((key) =>
    //   clearErrors(key as keyof ReservationFormValues)
    // );
    setReservationFormValues((o) => ({ ...o, ...change }))
  }

  const SPACEOPTIONS = [
    { key: '1', title: 'Space 1' },
    { key: '2', title: 'Space 2' },
    { key: '3', title: 'Space 3' },
    { key: '4', title: 'Space 4' },
  ]

  const SPACEPOSSIBILITIES = [
    { key: '1', title: 'Possibility 1' },
    { key: '2', title: 'Possibility 2' },
    { key: '3', title: 'Possibility 3' },
    { key: '4', title: 'Possibility 4' },
  ]

  // TODO: update plugin to grid columns

  return (
    <div className="z-10 w-10/12 mx-auto">
      <h1 className="font-semibold text-2xl text-center">Nezáväzná rezervácia</h1>

      <p className="font-medium text-default text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis non vitae ultrices sit lobortis arcu.
      </p>

      <form>
        <div className="flex flex-col md:flex-row gap-x-7.5">
          <div className="flex-grow">
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
                className="text-default"
                // hasError={!!errors?.name}
                value={reservationFormValues?.name}
                onChange={(e) => handleChange?.({ name: e.target.value })}
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
                className="text-default"
                // hasError={!!errors?.name}
                value={reservationFormValues?.name}
                onChange={(e) => handleChange?.({ name: e.target.value })}
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
                className="text-default"
                // hasError={!!errors?.email}
                value={reservationFormValues?.email}
                onChange={(e) => handleChange?.({ email: e.target.value })}
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
                className="text-default"
                placeholder="+421 111 222 333"
                // hasError={!!errors?.email}
                value={reservationFormValues?.phone}
                onChange={(e) => handleChange?.({ phone: e.target.value })}
              />
            </Field>
          </div>

          <div className="flex-grow">
            <Field
              id="date"
              title="Termín"
              className="w-full"
              // error={errors?.email}
            >
              <InputAccessory
                className="text-primary w-full flex justify-between"
                iconPosition="right"
                icon={<Calendar />}
              >
                <Input
                  id="date"
                  name="date"
                  type="date"
                  min={LocalDate.now().toJSON()}
                  className="text-default text-font w-full h-12.5 focus:outline-none"
                  // hasError={!!errors?.email}
                  value={reservationFormValues?.date}
                  onChange={(e) =>
                    handleChange?.({
                      date: e.target.value,
                    })
                  }
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
                className="text-default pt-5 pb-3.5"
                rows={11}
                // hasError={!!errors?.email}
                value={reservationFormValues?.notes}
                onChange={(e) => handleChange?.({ notes: e.target.value })}
              />
            </Field>
          </div>
        </div>

        <div className="flex justify-center">
          <Field id="terms" className="w-full text-center">
            <CheckBox
              className="md:gap-x-6 py-3"
              id="terms"
              content="Oboznámil/a som sa so všeobecnými obchodnými podmienkami."
              checked={reservationFormValues?.acceptTerms}
              onChange={(e) => handleChange?.({ acceptTerms: e.target.checked })}
            />
          </Field>
        </div>

        <div className="flex justify-center">
          <Button className="mt-8 lg:mt-10 w-3/12 h-12 text-default font-medium">Nezáväzne rezervovať</Button>
        </div>
      </form>
    </div>
  )
}

export default WeddingForm
