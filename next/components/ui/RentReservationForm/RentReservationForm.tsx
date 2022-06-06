import { LocalDate } from '@js-joda/core';
import React from 'react';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';
import { InputAccessory } from '../InputAccessory/InputAccessory';
import { CheckBox } from '../CheckBox/CheckBox';
import { Button } from '../Button/Button';
import { ReactComponent as Calendar } from '../../assets/images/calendar-form.svg';

interface IProps {
  className?: string;
}

export interface ReservationFormValues {
  name: string;
  email: string;
  phone: string;
  spaceId: string; //TODO: From DB
  spacePossibilities: string; //TODO: From DB
  notes: string;
  date: string;
  acceptTerms: boolean;
}

export const RentReservationForm = ({ className }: IProps) => {
  // const [validate, { errors, clearErrors }] =
  //   useValidation<ReservationFormValues>(validateReservationForm);

  //TODO: From DB
  const [reservationFormValues, setReservationFormValues] =
    React.useState<ReservationFormValues>({
      name: '',
      email: '@',
      phone: '',
      spaceId: '',
      spacePossibilities: '',
      notes: '',
      date: LocalDate.now().toJSON(),
      acceptTerms: false,
    });

  const handleChange = (change: Partial<ReservationFormValues>) => {
    // Object.keys(change).forEach((key) =>
    //   clearErrors(key as keyof ReservationFormValues)
    // );
    setReservationFormValues((o) => ({ ...o, ...change }));
  };

  const handleSpaceChange = (option: typeof SPACEOPTIONS[0]) => {
    // const selectedVenue = venues?.find((v) => v.id === option.key);
    // if (selectedVenue) {
    //   handleChange?.({
    //     venueId: selectedVenue.id,
    //     poolId: selectedVenue.pools[0]?.id,
    //   });
    // }
  };

  const SPACEOPTIONS = [
    { key: '1', title: 'Space 1' },
    { key: '2', title: 'Space 2' },
    { key: '3', title: 'Space 3' },
    { key: '4', title: 'Space 4' },
  ];

  const SPACEPOSSIBILITIES = [
    { key: '1', title: 'Possibility 1' },
    { key: '2', title: 'Possibility 2' },
    { key: '3', title: 'Possibility 3' },
    { key: '4', title: 'Possibility 4' },
  ];

  // TODO: update plugin to grid columns

  return (
    <div className="z-10 md:w-10/12 mx-auto">
      <h1 className="font-semibold text-2xl text-center">
        Nezáväzná rezervácia
      </h1>

      <div className="flex mb-14 mt-7 text-center">
        <p className="font-medium text-default text-center px-2 lg:px-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convallis non
          vitae ultrices sit lobortis arcu.
        </p>
      </div>

      <form className="flex flex-col items-stretch gap-y-5">
        <div className="w-full md:flex gap-x-5">
          <div className="flex-grow">
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
                className="text-default"
                // hasError={!!errors?.name}
                value={reservationFormValues?.name}
                onChange={(e) => handleChange?.({ name: e.target.value })}
              />
            </Field>

            <Field
              id="email"
              title="E-mail"
              className="w-full col-span-5"
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
              // error={errors?.email}
            >
              <Input
                id="phone"
                name="phone"
                type="text"
                className="text-default"
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
                className="text-primary w-full flex justify-between"
                iconPosition="right"
                icon={<Calendar />}
              >
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="text-default text-font h-14 focus:outline-none"
                  // hasError={!!errors?.email}
                  value={reservationFormValues?.phone}
                  onChange={(e) => handleChange?.({ phone: e.target.value })}
                />
              </InputAccessory>
            </Field>
          </div>
          <div className="flex-grow">
            <Field
              id="spaceId"
              title="Priestor"
              className="w-full col-start-7 col-span-4"
              // error={errors?.email}
            >
              <Select
                className="w-full text-default"
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
              className="w-full col-start-7 col-span-4"
              // error={errors?.email}
            >
              <Select
                className="w-full text-default"
                id="spacePoss"
                // hasError={!!errors?.venueId}
                options={SPACEPOSSIBILITIES}
                value={
                  reservationFormValues?.spacePossibilities ||
                  SPACEPOSSIBILITIES[0]
                }
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
                className="text-default pt-5"
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
              className="md:gap-x-6 py-3"
              id="terms"
              content="Oboznámil/a som sa so všeobecnými obchodnými podmienkami."
              checked={reservationFormValues?.acceptTerms}
              onChange={(e) =>
                handleChange?.({ acceptTerms: e.target.checked })
              }
            />
          </Field>
        </div>

        <div className="flex justify-center">
          <Button className="mt-8 lg:mt-9 px-6 h-12 text-default font-medium">
            Nezáväzne rezervovať
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RentReservationForm;
