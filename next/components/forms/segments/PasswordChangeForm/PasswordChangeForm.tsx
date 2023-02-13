import { AccountError } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  oldPassword: string
  password: string
  passwordConfirmation: string
}

interface Props {
  onSubmit: (oldPassword: string, password: string) => Promise<any>
  error?: AccountError | null | undefined
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string',
      // min length set to 2 according to cognito error InvalidParameterException:
      // 1 validation error detected: Value at 'previousPassword' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$
      minLength: 2,
      errorMessage: { minLength: 'account:password_required' },
    },
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
  required: ['oldPassword', 'password', 'passwordConfirmation'],
}

const PasswordChangeForm = ({ onSubmit, error }: Props) => {
  const { t } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { oldPassword: '', password: '', passwordConfirmation: '' },
  })

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={handleSubmit((data: Data) => onSubmit(data.oldPassword, data.password))}
    >
      <h1 className="text-h3">{t('password_change_title')}</h1>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full" />}
      <Controller
        name="oldPassword"
        control={control}
        render={({ field }) => (
          <PasswordField
            required
            label={t('old_password_label')}
            placeholder={t('old_password_placeholder')}
            {...field}
            errorMessage={errors.oldPassword}
          />
        )}
      />
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

export default PasswordChangeForm
