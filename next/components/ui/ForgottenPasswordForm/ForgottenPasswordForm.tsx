import useAccount from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  email: string
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
  },
  required: ['email'],
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
    defaultValues: { email: '' },
  })
  const onSubmit = (data: Data) => {
    console.log(data.email)
  }

  return (
    <div>
      <h1 className="text-h3 mb-6">{t('forgotten_password_title')}</h1>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full mb-6" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              required
              label={t('email_label')}
              placeholder={t('email_placeholder')}
              className="mb-6"
              {...field}
              errorMessage={errors.email}
            />
          )}
        />
        <Button
          className="min-w-full my-6"
          type="submit"
          text={t('forgotten_password_submit')}
          variant="category"
          disabled={isSubmitting}
        />
      </form>
      <div className="flex justify-between">
        <div className="text-20-semibold hidden md:flex text-gray-800">
          {t('login_description')}
        </div>
        <Button variant="link-black" href="/" label={t('login_link')} endIconHidden />
      </div>
    </div>
  )
}

export default App
