import { RJSFSchema } from '@rjsf/utils'
import { Address, UserData } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import Button from '../../forms/simple-components/Button'
import InputField from '../../forms/widget-components/InputField/InputField'

interface Data {
  email: string
  given_name: string
  family_name: string
  phone_number: string
  street_address: string
  city: string
  postal_code: string
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    given_name: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:given_name_required' },
    },
    family_name: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:family_name_required' },
    },
    email: {
      type: 'string',
      minLength: 1,
      format: 'email',
      errorMessage: { minLength: 'account:email_required', format: 'account:email_format' },
    },
    phone_number: {
      type: 'string',
    },
    street_address: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    postal_code: {
      type: 'string',
    },
  },
  required: ['email', 'given_name', 'family_name'],
}

interface UserProfileDetailEditProps {
  formId: string
  userData: UserData
  onOpenEmailModal: () => void
  onSubmit: (newUserData: UserData) => void
}

const UserProfileDetailEdit = (props: UserProfileDetailEditProps) => {
  const { formId, userData, onOpenEmailModal, onSubmit } = props
  const { t } = useTranslation('account')
  const { handleSubmit, control, errors } = useHookForm<Data>({
    schema,
    defaultValues: {
      family_name: userData.family_name,
      given_name: userData.given_name,
      email: userData.email,
      phone_number: userData.phone_number,
      street_address: userData.address?.street_address,
      city: userData.address?.locality,
      postal_code: userData.address?.postal_code,
    },
  })

  const handleSubmitCallback = (data: Data) => {
    const newUserData: UserData = {
      email: data.email,
      given_name: data.given_name,
      family_name: data.family_name,
      phone_number: data.phone_number,
      address: {
        street_address: data.street_address,
        locality: data.city,
        postal_code: data.postal_code,
      },
    }

    return onSubmit(newUserData)
  }

  return (
    <form
      id={formId}
      className="flex flex-col grow gap-6 pb-20 sm:pb-0"
      onSubmit={handleSubmit(handleSubmitCallback)}
    >
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow ">
          <Controller
            name="given_name"
            control={control}
            render={({ field }) => (
              <InputField
                required
                label={t('profile_detail.given_name')}
                {...field}
                errorMessage={errors.given_name}
              />
            )}
          />
        </div>
        <div className="grow ">
          <Controller
            name="family_name"
            control={control}
            render={({ field }) => (
              <InputField
                required
                label={t('profile_detail.family_name')}
                {...field}
                errorMessage={errors.family_name}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <div className="grow">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                disabled
                label={t('profile_detail.email')}
                tooltip={t('profile_detail.email_tooltip')}
                autoComplete="username"
                {...field}
                errorMessage={errors.email}
              />
            )}
          />
        </div>
        <div className="justify-end flex flex-col py-1">
          <Button
            variant="black"
            size="sm"
            text={t('profile_detail.email_button')}
            onPress={onOpenEmailModal}
          />
        </div>
      </div>
      <div className="gap flex flex-wrap flex-row gap-x-6">
        <div className="grow ">
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <InputField
                label={t('profile_detail.phone_number')}
                helptext={t('profile_detail.phone_number_pattern')}
                {...field}
                errorMessage={errors.phone_number}
              />
            )}
          />
        </div>
        <div className="grow invisible h-0">
          <InputField label={t('profile_detail.phone_number')} />
        </div>
      </div>
      <div className="h-0 w-full border-b-2 border-gray-200" />
      <h5 className="text-h5">{t('profile_detail.address')}</h5>
      <Controller
        name="street_address"
        control={control}
        render={({ field }) => (
          <InputField
            label={t('profile_detail.street')}
            {...field}
            errorMessage={errors.street_address}
          />
        )}
      />
      <div className="gap flex flex-wrap flex-row gap-6">
        <div className="grow">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <InputField label={t('profile_detail.city')} {...field} errorMessage={errors.city} />
            )}
          />
        </div>
        <div className="w-52">
          <Controller
            name="postal_code"
            control={control}
            render={({ field }) => (
              <InputField
                label={t('profile_detail.postal_code')}
                {...field}
                errorMessage={errors.city}
              />
            )}
          />
        </div>
      </div>
    </form>
  )
}

export default UserProfileDetailEdit
