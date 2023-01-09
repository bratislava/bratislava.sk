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
  onSubmit: (password: string) => Promise<any> | any
  error?: AWSError | null | undefined
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:password_required' },
    },
    passwordConfirmation: {
      const: {
        $data: '1/password',
      },
      type: 'string',
      errorMessage: { const: 'account:password_not_match' },
    },
  },
  required: ['password', 'passwordConfirmation'],
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
      <h1 className="text-h3 mb-6">{t('forgotten_password_title')}</h1>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full mb-6" />}
      <form onSubmit={handleSubmit((data: Data) => onSubmit(data.password))}>
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
              label={t('password_label')}
              placeholder={t('password_placeholder')}
              description={t('password_description')}
              {...field}
              errorMessage={errors.passwordConfirmation}
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
        <Button variant="link-black" href="/login" label={t('login_link')} endIconHidden />
      </div>
    </div>
  )
}

export default NewPasswordForm
