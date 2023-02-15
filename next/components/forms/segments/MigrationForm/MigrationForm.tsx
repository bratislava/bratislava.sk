import { formatUnicorn } from '@utils/string'
import { AccountError } from '@utils/useAccount'
import useHookForm from '@utils/useHookForm'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'

interface Data {
  email: string
}

interface Props {
  onSubmit: (email: string) => Promise<any>
  error?: AccountError | null | undefined
}

const MigrationForm = ({ onSubmit, error }: Props) => {
  const router = useRouter()
  const email =
    router.query.email && typeof router.query.email === 'string'
      ? decodeURIComponent(router.query.email)
      : ''

  const fullname =
    router.query.fullname && typeof router.query.fullname === 'string'
      ? decodeURIComponent(router.query.fullname)
      : ''

  const schema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        minLength: 1,
        // validate input, not query param
        format: email ? undefined : 'email',
        errorMessage: { minLength: 'account:email_required', format: 'account:email_format' },
      },
    },
    required: ['email'],
  }

  const { t } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { email },
  })

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={handleSubmit((data: Data) => onSubmit(data.email))}
    >
      <h1 className="text-h3">
        {formatUnicorn(t(email ? 'migration_recognized_title' : 'migration_title'), { fullname })}
      </h1>
      <div>
        {formatUnicorn(t(email ? 'migration_recognized_description' : 'migration_description'), {
          email,
        })}
      </div>
      <div>{t('migration_submit_description')}</div>
      {error && <Alert message={t(error.code)} type="error" className="min-w-full" />}
      {!email && (
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
      )}
      <Button
        className="min-w-full"
        type="submit"
        text={t('migration_submit')}
        variant="category"
        disabled={isSubmitting}
      />
      <div className="flex justify-between flex-col md:flex-row">
        <div className="text-16-semibold text-gray-800">{t('login_description')}</div>
        <Button
          size="sm"
          variant="link-black"
          href="/login"
          label={t('login_link')}
          hrefIconHidden
        />
      </div>
      {!email && (
        <div className="flex justify-between flex-col md:flex-row">
          <div className="text-16-semibold text-gray-800">
            {t('migration_register_description')}
          </div>
          <Button
            size="sm"
            variant="link-category"
            href="/register"
            label={t('register_link')}
            hrefIconHidden
          />
        </div>
      )}
    </form>
  )
}

export default MigrationForm
