import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

export interface CorrespondenceAddressData {
  streeAddress: string
  locality: string
  postalCode: string
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    streeAddress: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'forms:street_address_required' },
    },
    locality: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'forms:locality_required' },
    },
    postalCode: {
      type: 'string',
      minLength: 5,
      errorMessage: { minLength: 'forms:postal_code_required' },
    },
  },
  required: ['streeAddress', 'locality', 'postalCode'],
}

interface Props {
  errorMessage?: string
  onSubmit: ({ data }: { data: CorrespondenceAddressData }) => void
  defaultValues: CorrespondenceAddressData
}

const CorrespondenceAddressForm = ({ errorMessage, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation('forms')

  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<CorrespondenceAddressData>({
    schema,
    defaultValues,
  })

  return (
    <form
      className="flex flex-col space-y-6 w-full"
      onSubmit={handleSubmit((data: CorrespondenceAddressData) => onSubmit({ data }))}
    >
      <div>{t('correspondece_address_description')}</div>
      {errorMessage && <Alert message={errorMessage} type="error" className="min-w-full" />}
      <Controller
        name="streeAddress"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('street_address_label')}
            placeholder={t('street_address_placeholder')}
            {...field}
            errorMessage={errors.streeAddress}
          />
        )}
      />
      <Controller
        name="locality"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('locality_label')}
            placeholder={t('locality_placeholder')}
            {...field}
            errorMessage={errors.locality}
          />
        )}
      />
      <Controller
        name="postalCode"
        control={control}
        render={({ field }) => (
          <InputField
            className="max-w-xs"
            required
            label={t('postal_code_label')}
            placeholder={t('postal_code_placeholder')}
            description={t('postal_code_description')}
            {...field}
            errorMessage={errors.postalCode}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t('submit')}
        variant="black"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default CorrespondenceAddressForm
