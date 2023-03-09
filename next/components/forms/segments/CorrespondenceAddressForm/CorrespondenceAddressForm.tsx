import { AccountError, Address } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

const schema = {
  type: 'object',
  properties: {
    street_address: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'forms:street_address_required' },
    },
    locality: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'forms:locality_required' },
    },
    postal_code: {
      type: 'string',
      minLength: 1,
      format: 'postalCode',
      errorMessage: {
        minLength: 'forms:postal_code_required',
        format: 'forms:postal_code_format',
      },
    },
  },
  required: ['street_address', 'locality', 'postal_code'],
}

interface Props {
  error?: AccountError | null
  onHideError?: () => void
  onSubmit: ({ data }: { data?: Address }) => void
  defaultValues?: Address
}

const CorrespondenceAddressForm = ({ error, onHideError, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation('forms')

  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Address>({
    schema,
    defaultValues: { street_address: '', locality: '', postal_code: '', ...defaultValues },
  })

  return (
    <form
      className="flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit((data: Address) => onSubmit({ data }))}
    >
      <p className="text-p3 lg:text-p2">{t('correspondece_address_description')}</p>
      {error && (
        <Alert
          message={t(error.code)}
          type="error"
          close={onHideError}
          solid
          className="min-w-full"
        />
      )}
      <Controller
        name="street_address"
        control={control}
        render={({ field }) => (
          <InputField
            label={t('street_address_label')}
            placeholder={t('street_address_placeholder')}
            required
            {...field}
            errorMessage={errors.street_address}
          />
        )}
      />
      <Controller
        name="locality"
        control={control}
        render={({ field }) => (
          <InputField
            label={t('locality_label')}
            placeholder={t('locality_placeholder')}
            {...field}
            errorMessage={errors.locality}
            required
          />
        )}
      />
      <Controller
        name="postal_code"
        control={control}
        render={({ field }) => (
          <InputField
            tooltip={t('postal_code_tooltip')}
            label={t('postal_code_label')}
            placeholder={t('postal_code_placeholder')}
            size="default"
            required
            {...field}
            errorMessage={errors.postal_code}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t('changes_submit')}
        variant="black"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default CorrespondenceAddressForm
