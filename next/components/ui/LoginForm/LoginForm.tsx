import useHookForm from '@utils/useHookForm'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { Controller } from 'react-hook-form'

// must use `minLength: 1` to implement required field
const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'email field is required' },
    },
    password: {
      type: 'string',
      minLength: 1,
      errorMessage: { minLength: 'password field is required' },
    },
  },
  required: ['email', 'password'],
}

const App = () => {
  const { handleSubmit, control, errors } = useHookForm({
    schema,
    defaultValues: { email: '', password: '' },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <div>
      <h1 className="text-h3">login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField label="email" placeholder="email" {...field} errorMessage={errors.email} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              label="password"
              placeholder="password"
              type="password"
              {...field}
              errorMessage={errors.password}
            />
          )}
        />
        <Button className="min-w-full mt-4" type="submit" text="submit" variant="category" />
      </form>
    </div>
  )
}

export default App
