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
    stree_address: {
      type: 'string',
    },
    locality: {
      type: 'string',
    },
    postal_code: {
      type: 'string',
      format: 'postalCode',
      errorMessage: { format: 'forms:postal_code_format' },
    },
  },
  required: [],
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
    defaultValues: defaultValues || { street_address: '', locality: '', postal_code: '' },
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
          />
        )}
      />
      <Controller
        name="postal_code"
        control={control}
        render={({ field }) => (
          <InputField
            className="max-w-xs"
            label={t('postal_code_label')}
            placeholder={t('postal_code_placeholder')}
            helptext={t('postal_code_description')}
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
