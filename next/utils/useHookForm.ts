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
        rc: (value: string) => {
          value = value.replace('/', '')
          if (value.length !== 10) {
            return false
          }

          const rc = Number(value)
          return !Number.isNaN(rc) && rc % 11 === 0
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
