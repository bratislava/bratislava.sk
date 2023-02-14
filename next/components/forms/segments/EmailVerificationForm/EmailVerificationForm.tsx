import { formatUnicorn } from '@utils/string'
import useHookForm from '@utils/useHookForm'
import { AWSError } from 'aws-sdk/global'
import Alert from 'components/forms/info-components/Alert'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

interface Data {
  verificationCode: string
}

interface Props {
  onSubmit: (verificationCode: string) => Promise<any>
  onResend: () => Promise<any>
  error?: AWSError | null | undefined
  lastEmail?: string
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
  },
  required: ['verificationCode'],
}

const EmailVerificationForm = ({ onSubmit, error, onResend, lastEmail }: Props) => {
  const [lastVerificationCode, setLastVerificationCode] = useState('')
  const { t } = useTranslation('account')
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { verificationCode: '' },
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
        onSubmit(data.verificationCode)
      })}
    >
      <h1 className="text-h3">{t('email_verification_title')}</h1>
      <div>{formatUnicorn(t('email_verification_description'), { email: lastEmail || '' })}</div>
      {error && (
        <Alert
          message={formatUnicorn(t(error.code), {
            email: lastEmail || '',
            verificationCode: lastVerificationCode,
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
      <Button
        className="min-w-full"
        type="submit"
        text={t('email_verification_submit')}
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
    </form>
  )
}

export default EmailVerificationForm
