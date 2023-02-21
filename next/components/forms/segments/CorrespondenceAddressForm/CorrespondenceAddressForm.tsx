import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

export interface CorrespondenceAddressData {
  streeAddress?: string
  locality?: string
  postalCode?: string
}

const schema = {
  type: 'object',
  properties: {
    streeAddress: {
      type: 'string',
    },
    locality: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
      format: 'postalCode',
      errorMessage: { format: 'forms:postal_code_format' },
    },
  },
  required: [],
}

interface Props {
  errorMessage?: string
  onHideErrorMessage?: () => void
  onSubmit: ({ data }: { data?: CorrespondenceAddressData }) => void
  defaultValues: CorrespondenceAddressData
}

const CorrespondenceAddressForm = ({
  errorMessage,
  onHideErrorMessage,
  onSubmit,
  defaultValues,
}: Props) => {
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
      className="flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit((data: CorrespondenceAddressData) => onSubmit({ data }))}
    >
      <p className="text-p3 lg:text-p2">{t('correspondece_address_description')}</p>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          close={onHideErrorMessage}
          solid
          className="min-w-full"
        />
      )}
      <Controller
        name="streeAddress"
        control={control}
        render={({ field }) => (
          <InputField
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
            label={t('postal_code_label')}
            placeholder={t('postal_code_placeholder')}
            helptext={t('postal_code_description')}
            {...field}
            errorMessage={errors.postalCode}
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
