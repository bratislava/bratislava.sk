import { AccountError } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

export interface PhoneNumberData {
  phone_number?: string
}

const schema = {
  type: 'object',
  properties: {
    phone_number: {
      type: 'string',
    },
  },
  required: [],
}

interface Props {
  error?: AccountError | null
  onHideError?: () => void
  onSubmit: ({ data }: { data?: PhoneNumberData }) => void
  defaultValues?: PhoneNumberData
}

const PhoneNumberForm = ({ error, onHideError, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation('forms')
  const { t: t1 } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<PhoneNumberData>({
    schema,
    defaultValues: { ...defaultValues },
  })

  return (
    <form
      className="flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit((data: PhoneNumberData) => onSubmit({ data }))}
    >
      <p className="text-p3 lg:text-p2 whitespace-pre-line">
        {t('adding_phone_number_description')}
      </p>
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
        name="phone_number"
        control={control}
        render={({ field }) => (
          <InputField
            label={`${t1('profile_detail.phone_number')} (${t1(
              'profile_detail.phone_number_pattern',
            ).toLowerCase()})`}
            placeholder=""
            {...field}
            errorMessage={errors.phoneNumber}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t1('profile_detail.save_button')}
        variant="black"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default PhoneNumberForm
