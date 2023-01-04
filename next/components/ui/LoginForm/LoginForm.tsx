import useAccount from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  email: string
  password: string
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:email_required' },
    },
    password: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:password_required' },
    },
  },
  required: ['email', 'password'],
}

const App = () => {
  const { login, user, error } = useAccount()
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
  const onSubmit = (data: Data) => login(data.email, data.password)

  return (
    <div>
      <h1 className="text-h3">{t('login_title')}</h1>
      {user && <Alert message={user.getUsername()} type="success" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
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
            <InputField
              label={t('password_label')}
              placeholder={t('password_placeholder')}
              type="password"
              {...field}
              errorMessage={errors.password}
            />
          )}
        />
        <Button
          className="min-w-full my-4"
          type="submit"
          text={t('login_submit')}
          variant="category"
          disabled={isSubmitting}
        />
        {error && <Alert message={t(error.code)} type="error" />}
      </form>
    </div>
  )
}

export default App
