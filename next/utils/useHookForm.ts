import { ajvResolver } from '@hookform/resolvers/ajv'
import { JSONSchemaType } from 'ajv'
import { useTranslation } from 'next-i18next'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'

interface Errors {
  [key: string]: string[]
}

interface Props<T> {
  // used any as strictNullChecks must be true in tsconfig to use JSONSchemaType<T>
  schema: any
  defaultValues: DefaultValues<T>
}

export default function useHookForm<T extends FieldValues>({ schema, defaultValues }: Props<T>) {
  const { t } = useTranslation()
  const form = useForm({
    resolver: ajvResolver(schema as JSONSchemaType<T>, {
      formats: {
        email:
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        password:
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[ !"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-]).{8,}$/,
        postalCode: '^([0-9]{5}|)$',
        rc: (value: string) => {
          value = value.replace('/', '')

          const rc = Number(value)
          if (Number.isNaN(rc)) {
            return false
          }
          if (value.length === 9) {
            return true
          }
          if (value.length === 10) {
            return rc % 11 === 0 || (rc % 10 === 0 && (rc / 10) % 11 === 10)
          }
          return false
        },
        verificationCode: '^[0-9]{6}$',
      },
      $data: true,
    }),
    defaultValues,
  })

  const errors: Errors = {}
  Object.keys(form.formState.errors).forEach((key: string) => {
    const errorMessage = form.formState.errors[key]?.message?.toString()
    errors[key] = [t(errorMessage || 'error')]
  })

  return { ...form, errors }
}
