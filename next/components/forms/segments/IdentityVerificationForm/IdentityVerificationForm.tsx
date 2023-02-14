import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
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
  rc: string
  idCard: string
}

interface Props {
  onSubmit: (rc: string, idCard: string) => void
  error?: AccountError | null | undefined
}

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    rc: {
      type: 'string',
      minLength: 1,
      format: 'rc',
      errorMessage: { minLength: 'account:rc_required', format: 'account:rc_format' },
    },
    idCard: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'account:id_card_required' },
    },
  },
  required: ['rc', 'idCard'],
}

const IdentityVerificationForm = ({ onSubmit, error }: Props) => {
  const { t } = useTranslation('account')
  const router = useRouter()
  const {
    handleSubmit,
    control,
    errors,
    formState: { isSubmitting },
  } = useHookForm<Data>({
    schema,
    defaultValues: { rc: '', idCard: '' },
  })

  return (
    <form
      className="flex flex-col space-y-4"
      onSubmit={handleSubmit((data: Data) => onSubmit(data.rc, data.idCard))}
    >
      <h1 className="text-h3">{t('identity_verification_title')}</h1>
      {error && (
        <Alert message={formatUnicorn(t(error.code), {})} type="error" className="min-w-full" />
      )}
      <Controller
        name="rc"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('rc_label')}
            placeholder={t('rc_placeholder')}
            helptext={t('rc_description')}
            tooltip={t('rc_tooltip')}
            {...field}
            errorMessage={errors.rc}
          />
        )}
      />
      <Controller
        name="idCard"
        control={control}
        render={({ field }) => (
          <InputField
            required
            label={t('id_card_label')}
            placeholder={t('id_card_placeholder')}
            helptext={t('id_card_description')}
            tooltip={t('id_card_tooltip')}
            {...field}
            errorMessage={errors.idCard}
          />
        )}
      />
      <Button
        className="min-w-full"
        type="submit"
        text={t('identity_verification_submit')}
        variant="category"
        disabled={isSubmitting}
      />
      <Button
        variant="plain-black"
        className="min-w-full"
        onPress={() => router.push('/')}
        text={t('identity_verification_skip')}
        endIcon={<ArrowRightIcon />}
      />
    </form>
  )
}

export default IdentityVerificationForm
