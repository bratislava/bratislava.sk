import { ajvResolver } from '@hookform/resolvers/ajv'
import { useForm } from 'react-hook-form'

interface Errors {
  [key: string]: string[]
}

export default function useHookForm({ schema }) {
  const form = useForm({
    resolver: ajvResolver(schema),
  })

  const errors: Errors = {}
  Object.keys(form.formState.errors).forEach((key) => {
    errors[key] = [form.formState.errors[key].message.toString()]
  })

  return { ...form, errors }
}
