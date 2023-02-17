import { formatUnicorn } from '@utils/string'
import { AccountError } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import LoginAccountLink from 'components/forms/segments/LoginAccountLink/LoginAccountLink'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

interface Data {
  verificationCode: string
  password: string
  passwordConfirmation: string
}

interface Props {
  onSubmit: (verificationCode: string, password: string) => Promise<any>
  onResend: () => Promise<any>
  error?: AccountError | null | undefined
  lastEmail: string
  fromMigration?: boolean
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    verificationCode: {
      type: 'string',
      minLength: 1,
      format: 'verificationCode',
      errorMessage: {
        minLength: 'account:verification_code_required',
        format: 'account:verification_code_format',
      },
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
  required: ['verificationCode', 'password', 'passwordConfirmation'],
}

const NewPasswordForm = ({ onSubmit, error, onResend, lastEmail, fromMigration }: Props) => {
  const [lastVerificationCode, setLastVerificationCode] = useState<string>('')
  const { t } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { verificationCode: '', password: '', passwordConfirmation: '' },
  })

  const [cnt, setCnt] = useState(60)
  useEffect(() => {
    if (cnt > 0) {
      setTimeout(() => setCnt((state) => state - 1), 1000)
    }
  }, [cnt])

  const handleResend = async () => {
    setCnt(60)
    await onResend()
  }

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={handleSubmit((data: Data) => {
        setLastVerificationCode(data.verificationCode)
        onSubmit(data.verificationCode, data.password)
      })}
    >
      <h1 className="text-h3">
        {t(fromMigration ? 'migration_new_password_title' : 'new_password_title')}
      </h1>
      <div>{formatUnicorn(t('new_password_description'), { email: lastEmail })}</div>
      {error && (
        <Alert
          message={formatUnicorn(t(error.code), {
            verificationCode: lastVerificationCode,
            email: lastEmail,
          })}
          type="error"
          className="min-w-full"
        />
      )}
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
            label={t(fromMigration ? 'password_label' : 'new_password_label')}
            placeholder={t(fromMigration ? 'password_placeholder' : 'new_password_placeholder')}
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
            label={t(
              fromMigration ? 'password_confirmation_label' : 'new_password_confirmation_label',
            )}
            placeholder={t(
              fromMigration
                ? 'password_confirmation_placeholder'
                : 'new_password_confirmation_placeholder',
            )}
            {...field}
            errorMessage={errors.passwordConfirmation}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t(fromMigration ? 'migration_new_password_submit' : 'new_password_submit')}
        variant="category"
        disabled={isSubmitting}
      />
      <div>
        <span>{t('verification_description')}</span>
        {cnt > 0 && <span>{` ${formatUnicorn(t('verification_cnt_description'), { cnt })}`}</span>}
      </div>
      <Button
        onPress={handleResend}
        className="min-w-full"
        text={t('verification_resend')}
        variant="category-outline"
        disabled={cnt > 0}
      />
      <LoginAccountLink />
    </form>
  )
}

export default NewPasswordForm
