import useHookForm from '@utils/useHookForm'
import { AWSError } from 'aws-sdk/global'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  verificationCode: string
  password: string
  passwordConfirmation: string
}

interface Props {
  onSubmit: (verificationCode: string, password: string) => Promise<any>
  error?: AWSError | null | undefined
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    verificationCode: {
      type: 'string',
      minLength: 6,
      errorMessage: { minLength: 'account:verification_code_required' },
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
      errorMessage: { const: 'account:password_not_match' },
    },
  },
  required: ['verificationCode', 'password', 'passwordConfirmation'],
}

const NewPasswordForm = ({ onSubmit, error }: Props) => {
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
    <div>
      <h1 className="text-h3 mb-6">{t('new_password_title')}</h1>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full mb-6" />}
      <form onSubmit={handleSubmit((data: Data) => onSubmit(data.verificationCode, data.password))}>
        <Controller
          name="verificationCode"
          control={control}
          render={({ field }) => (
            <InputField
              required
              label={t('verification_code_label')}
              placeholder={t('verification_code_placeholder')}
              {...field}
              errorMessage={errors.verificationCode}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordField
              required
              label={t('password_label')}
              placeholder={t('password_placeholder')}
              description={t('password_description')}
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
              label={t('password_confirmation_label')}
              placeholder={t('password_confirmation_placeholder')}
              {...field}
              errorMessage={errors.passwordConfirmation}
            />
          )}
        />
        <Button
          className="min-w-full my-6"
          type="submit"
          text={t('new_password_submit')}
          variant="category"
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}

export default NewPasswordForm
