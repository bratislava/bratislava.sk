import { formatUnicorn } from '@utils/string'
import { UserData } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import { AWSError } from 'aws-sdk/global'
import Alert from 'components/forms/info-components/Alert'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import Button from 'components/forms/simple-components/Button'
import SingleCheckbox from 'components/forms/widget-components/Checkbox/SingleCheckbox'
import InputField from 'components/forms/widget-components/InputField/InputField'
import PasswordField from 'components/forms/widget-components/PasswordField/PasswordField'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

interface Data {
  email: string
  given_name: string
  family_name: string
  password: string
  passwordConfirmation: string
  gdprConfirmation: boolean
  marketingConfirmation: boolean
}

interface Props {
  onSubmit: (email: string, password: string, userData: UserData) => Promise<any>
  error?: AWSError | null | undefined
  lastEmail?: string
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
    given_name: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:given_name_required' },
    },
    family_name: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:family_name_required' },
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
    'given_name',
    'family_name',
    'password',
    'passwordConfirmation',
    'gdprConfirmation',
    'marketingConfirmation',
  ],
}

const RegisterForm = ({ onSubmit, error, lastEmail }: Props) => {
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
      family_name: '',
      given_name: '',
      password: '',
      passwordConfirmation: '',
      gdprConfirmation: true,
      marketingConfirmation: false,
    },
  })

  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={handleSubmit((data: Data) => {
        const userData: UserData = {
          email: data.email,
          given_name: data.given_name,
          family_name: data.family_name,
        }

        return onSubmit(data.email, data.password, userData)
      })}
    >
      <h1 className="text-h3">{t('register_title')}</h1>
      {error && (
        <Alert
          message={formatUnicorn(t(error.code), { email: lastEmail || '' })}
          type="error"
          className="min-w-full"
        />
      )}
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
        name="given_name"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('given_name_label')}
            placeholder={t('given_name_placeholder')}
            {...field}
            errorMessage={errors.given_name}
          />
        )}
      />
      <Controller
        name="family_name"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('family_name_label')}
            placeholder={t('family_name_placeholder')}
            {...field}
            errorMessage={errors.family_name}
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
        <Controller
          name="gdprConfirmation"
          control={control}
          render={({ field }) => (
            <SingleCheckbox
              value="gdprConfirmation"
              isSelected={field.value}
              onChange={field.onChange}
              required
              fullWidth
              error={errors.gdprConfirmation?.length > 0}
            >
              {t('gdpr_confirmation_label')}
            </SingleCheckbox>
          )}
        />
        <FieldErrorMessage errorMessage={errors.gdprConfirmation} />
      </div>
      <Controller
        name="marketingConfirmation"
        control={control}
        render={({ field }) => (
          <SingleCheckbox
            value="marketingConfirmation"
            isSelected={field.value}
            onChange={field.onChange}
            fullWidth
            error={errors.marketingConfirmation?.length > 0}
          >
            {t('marketing_confirmation_label')}
          </SingleCheckbox>
        )}
      />
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
