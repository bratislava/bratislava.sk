import { UserData } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import { AWSError } from 'aws-sdk/global'
import Alert from 'components/forms/info-components/Alert'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import FieldHeader from 'components/forms/info-components/FieldHeader'
import Button from 'components/forms/simple-components/Button'
import Toggle from 'components/forms/simple-components/Toggle'
import InputField from 'components/forms/widget-components/InputField/InputField'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
  gdprConfirmation: boolean
  marketingConfirmation: boolean
}

interface Props {
  onSubmit: (email: string, password: string, userData: UserData) => void
  error?: AWSError | null | undefined
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
    firstName: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:first_name_required' },
    },
    lastName: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:last_name_required' },
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
    gdprConfirmation: {
      const: true,
      type: 'boolean',
      errorMessage: { const: 'account:gdpr_confirmation_required' },
    },
    marketingConfirmation: {
      type: 'boolean',
    },
  },
  required: [
    'email',
    'firstName',
    'lastName',
    'password',
    'passwordConfirmation',
    'gdprConfirmation',
    'marketingConfirmation',
  ],
}

const RegisterForm = ({ onSubmit, error }: Props) => {
  const { t } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      gdprConfirmation: true,
      marketingConfirmation: true,
    },
  })

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={handleSubmit((data: Data) => {
        const userData: UserData = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          marketingConfirmation: data.marketingConfirmation,
        }

        return onSubmit(data.email, data.password, userData)
      })}
    >
      <h1 className="text-h3">{t('register_title')}</h1>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full" />}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            required
            description={t('email_description')}
            label={t('email_label')}
            placeholder={t('email_placeholder')}
            {...field}
            errorMessage={errors.email}
          />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('first_name_label')}
            placeholder={t('first_name_placeholder')}
            {...field}
            errorMessage={errors.firstName}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('last_name_label')}
            placeholder={t('last_name_placeholder')}
            {...field}
            errorMessage={errors.lastName}
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
      <div>
        <div className="flex flex-row justify-between">
          <FieldHeader htmlFor="gdprConfirmation" label={t('gdpr_confirmation_label')} required />
          <Controller
            name="gdprConfirmation"
            control={control}
            render={({ field }) => (
              <Toggle value="gdprConfirmation" onChange={field.onChange} isSelected={field.value} />
            )}
          />
        </div>
        <FieldErrorMessage errorMessage={errors.gdprConfirmation} />
      </div>
      <div className="flex flex-row justify-between">
        <FieldHeader htmlFor="marketingConfirmation" label={t('marketing_confirmation_label')} />
        <Controller
          name="marketingConfirmation"
          control={control}
          render={({ field }) => (
            <Toggle
              value="marketingConfirmation"
              onChange={field.onChange}
              isSelected={field.value}
            />
          )}
        />
      </div>
      <Button
        className="min-w-full"
        type="submit"
        text={t('register_submit')}
        variant="category"
        disabled={isSubmitting}
      />
      <div className="flex justify-between">
        <div className="text-20-semibold hidden md:flex text-gray-800">
          {t('login_description')}
        </div>
        <Button variant="link-black" href="/login" label={t('login_link')} hrefIconHidden />
      </div>
    </form>
  )
}

export default RegisterForm
