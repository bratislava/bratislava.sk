import { LocalDate } from '@js-joda/core'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Calendar from '../../../assets/images/calendar-form.svg'
import { Button } from '../Button/Button'
import { CheckBox } from '../CheckBox/CheckBox'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { InputAccessory } from '../InputAccessory/InputAccessory'
import { Select } from '../Select/Select'
import { TextArea } from '../TextArea/TextArea'

interface IProps {
  className?: string
}

export interface ReservationFormValues {
  name: string
  email: string
  phone: string
  spaceId: string // TODO: From DB
  spacePossibilities: string // TODO: From DB
  notes: string
  date: string
  acceptTerms: boolean
}

export const RentReservationForm = ({ className }: IProps) => {
  // const [validate, { errors, clearErrors }] =
  //   useValidation<ReservationFormValues>(validateReservationForm);

  // TODO: From DB
  const [reservationFormValues, setReservationFormValues] = React.useState<ReservationFormValues>({
    name: '',
    email: '@',
    phone: '',
    spaceId: '',
    spacePossibilities: '',
    notes: '',
    date: LocalDate.now().toJSON(),
    acceptTerms: false,
  })
  const { t } = useTranslation()

  const handleChange = (change: Partial<ReservationFormValues>) => {
    // Object.keys(change).forEach((key) =>
    //   clearErrors(key as keyof ReservationFormValues)
    // );
    setReservationFormValues((o) => ({ ...o, ...change }))
  }

  const handleSpaceChange = (option: typeof SPACEOPTIONS[0]) => {
    // const selectedVenue = venues?.find((v) => v.id === option.key);
    // if (selectedVenue) {
    //   handleChange?.({
    //     venueId: selectedVenue.id,
    //     poolId: selectedVenue.pools[0]?.id,
    //   });
    // }
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
    <div className="z-10 mx-auto md:w-10/12">
      <h1 className="text-h1 text-center">{t('nonbinding')}</h1>

      <div className="mb-14 mt-7 flex text-center">
        <p className="text-p1-medium px-2 text-center lg:px-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis non vitae ultrices sit
          lobortis arcu.
        </p>
      </div>

      <form className="flex flex-col items-stretch gap-y-5">
        <div className="w-full gap-x-5 md:flex">
          <div className="grow">
            <Field
              id="name"
              title="Meno a Priezvisko"
              // error={errors?.name}
              className="w-full"
            >
              <Input
                id="name"
                name="name"
                type="text"
                className="text-20"
                // hasError={!!errors?.name}
                value={reservationFormValues?.name}
                onChange={(e) => handleChange?.({ name: e.target.value })}
              />
            </Field>

            <Field
              id="email"
              title="E-mail"
              className="col-span-5 w-full"
              // error={errors?.email}
            >
              <Input
                id="email"
                name="email"
                type="email"
                className="text-20"
                // hasError={!!errors?.email}
                value={reservationFormValues?.email}
                onChange={(e) => handleChange?.({ email: e.target.value })}
              />
            </Field>

            <Field
              id="phone"
              title="Telefón"
              className="w-full"
              // error={errors?.email}
            >
              <Input
                id="phone"
                name="phone"
                type="text"
                className="text-20"
                // hasError={!!errors?.email}
                value={reservationFormValues?.phone}
                onChange={(e) => handleChange?.({ phone: e.target.value })}
              />
            </Field>
            <Field
              id="date"
              title="Termín"
              className="w-full lg:w-1/2"
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
                  className="text-20 h-14 text-font focus:outline-none"
                  // hasError={!!errors?.email}
                  // TODO this can't work refering to property "work" even when this is "date"
                  value={reservationFormValues?.phone}
                  onChange={(e) => handleChange?.({ phone: e.target.value })}
                />
              </InputAccessory>
            </Field>
          </div>
          <div className="grow">
            <Field
              id="spaceId"
              title="Priestor"
              className="col-span-4 col-start-7 w-full"
              // error={errors?.email}
            >
              <Select
                className="text-20 w-full"
                id="spaceId"
                // hasError={!!errors?.venueId}
                options={SPACEOPTIONS}
                value={reservationFormValues?.spaceId || SPACEOPTIONS[0]}
                onChange={(s) => handleChange?.({ spaceId: s.key })}
              />
            </Field>

            <Field
              id="spacePoss"
              title="Ďalšie možnosti priestoru"
              className="col-span-4 col-start-7 w-full"
              // error={errors?.email}
            >
              <Select
                className="text-20 w-full"
                id="spacePoss"
                // hasError={!!errors?.venueId}
                options={SPACEPOSSIBILITIES}
                value={reservationFormValues?.spacePossibilities || SPACEPOSSIBILITIES[0]}
                onChange={(s) => handleChange?.({ spacePossibilities: s.key })}
              />
            </Field>

            <Field
              id="notes"
              title="Ďalšie možnosti priestoru"
              className="w-full "
              // error={errors?.email}
            >
              <TextArea
                id="notes"
                name="notes"
                className="text-20 pt-5"
                rows={11}
                // hasError={!!errors?.email}
                value={reservationFormValues?.notes}
                onChange={(e) => handleChange?.({ notes: e.target.value })}
              />
            </Field>
          </div>
        </div>

        <div className="flex justify-center">
          <Field id="terms" className="text-center">
            <CheckBox
              className="py-3 md:gap-x-6"
              id="terms"
              content="Oboznámil/a som sa so všeobecnými obchodnými podmienkami."
              checked={reservationFormValues?.acceptTerms}
              onChange={(e) => handleChange?.({ acceptTerms: e.target.checked })}
            />
          </Field>
        </div>

        <div className="flex justify-center">
          <Button className="text-20-medium mt-8 h-12 px-6 lg:mt-9">
            {t('nonbindingConfirm')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RentReservationForm
