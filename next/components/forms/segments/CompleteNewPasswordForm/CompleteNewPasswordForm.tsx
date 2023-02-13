import useHookForm from '@utils/useHookForm'
import { AWSError } from 'aws-sdk/global'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  password: string
  passwordConfirmation: string
}

interface Props {
  onSubmit: (password: string) => Promise<any>
  error?: AWSError | null | undefined
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 1,
      format: 'password',
      errorMessage: { minLength: 'account:password_required', format: 'account:password_format' },
    },
    passwordConfirmation: {
      const: {
        $data: '1/password',
      },
      type: 'string',
      errorMessage: { const: 'account:password_confirmation_required' },
    },
  },
  required: ['password', 'passwordConfirmation'],
}

const CompleteNewPasswordForm = ({ onSubmit, error }: Props) => {
  const { t } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { password: '', passwordConfirmation: '' },
  })

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={handleSubmit((data: Data) => {
        onSubmit(data.password)
      })}
    >
      <h1 className="text-h3">{t('new_password_title')}</h1>
      <div>{t('new_password_description')}</div>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full" />}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            required
            label={t('new_password_label')}
            placeholder={t('new_password_placeholder')}
            tooltip={t('password_description')}
            {...field}
            errorMessage={errors.password}
          />
        )}
      />
      <Controller
        name="passwordConfirmation"
        control={control}
        render={({ field }) => (
          <PasswordField
            required
            label={t('new_password_confirmation_label')}
            placeholder={t('new_password_confirmation_placeholder')}
            {...field}
            errorMessage={errors.passwordConfirmation}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t('new_password_submit')}
        variant="category"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default CompleteNewPasswordForm
