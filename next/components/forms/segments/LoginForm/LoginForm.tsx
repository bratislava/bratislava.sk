import { AccountError } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  email: string
  password: string
}

interface Props {
  onSubmit: (email: string, password: string) => Promise<any>
  error?: AccountError | null | undefined
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
      format: 'email',
      errorMessage: { minLength: 'account:email_required', format: 'account:email_format' },
    },
    password: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:password_required' },
    },
  },
  required: ['email', 'password'],
}

const LoginForm = ({ onSubmit, error }: Props) => {
  const { t } = useTranslation('account')

  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { email: '', password: '' },
  })

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={handleSubmit((data: Data) => onSubmit(data.email, data.password))}
    >
      <h1 className="text-h3">{t('login_title')}</h1>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full" />}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('email_label')}
            placeholder={t('email_placeholder')}
            {...field}
            errorMessage={errors.email}
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
            {...field}
            errorMessage={errors.password}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t('login_submit')}
        variant="category"
        disabled={isSubmitting}
      />
      <div className="flex justify-between">
        <div className="text-20-semibold hidden md:flex text-gray-800">
          {t('forgotten_password_description')}
        </div>
        <Button
          variant="link-black"
          href="/forgotten-password"
          label={t('forgotten_password_link')}
          hrefIconHidden
        />
      </div>
    </form>
  )
}

export default LoginForm
